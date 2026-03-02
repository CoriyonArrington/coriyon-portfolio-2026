import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { supabase } from '@/lib/supabase';

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch all dynamic data, including ALL pages
    const [
      { data: services },
      { data: faqs },
      { data: projects },
      { data: pages }
    ] = await Promise.all([
      supabase.from('services').select('title_en, description_en').order('sort_order'),
      supabase.from('faqs').select('question_en, answer_en'),
      supabase.from('projects').select('title_en, description_en').eq('status', 'PUBLISHED').limit(3),
      // Fetch the slug and both languages for every page
      supabase.from('pages').select('slug, content_en, content_es')
    ]);

    // 2. Format standard tables into markdown
    const servicesText = services?.map(s => `- **${s.title_en}**: ${s.description_en}`).join('\n') || 'App Design, App Development, Product Strategy';
    const faqsText = faqs?.map(f => `- **Q:** ${f.question_en}\n  **A:** ${f.answer_en}`).join('\n') || 'Typical project takes 2-3 months.';
    const projectsText = projects?.map(p => `- **${p.title_en}**: ${p.description_en}`).join('\n') || 'Smarter Patient Portal, AI-Built Therapy App';
    
    // 3. Stringify all page content so the AI knows everything on the site
    const allPagesText = pages?.map(page => 
      `--- Page: ${page.slug} ---\n` +
      `Content (EN): ${JSON.stringify(page.content_en)}\n` +
      `Content (ES): ${JSON.stringify(page.content_es)}`
    ).join('\n\n') || 'No additional page content.';

    // 4. Inject into the prompt
    const DYNAMIC_SYSTEM_PROMPT = `
You are Coriyon AI, the personal AI assistant for Coriyon Arrington's portfolio website.
Your goal is to help visitors learn about Coriyon's work, process, and services based on the provided database context.

**About Coriyon:**
- Senior Product Designer and UX Engineer based in Minneapolis, MN.
- Owner of Fearfully Forged LLC.
- 2026 President for UXPA Minnesota.
- Expert in Next.js, Supabase, Chakra UI, and AI-driven development.
- Focuses on bridging the gap between design, technology, and business to bring high-impact digital products to life fast.

**Services Offered:**
${servicesText}

**Key Projects:**
${projectsText}

**Standard FAQs:**
${faqsText}

**Website Page Context (JSON):**
Use the following JSON data to answer specific questions about Coriyon's process, workflow, and other website details in the user's preferred language:
${allPagesText}

**Tone & Style:**
- Friendly, concise, and professional.
- Keep answers relatively short. Use bullet points for readability.
- Do not hallucinate projects or facts. Base your answers strictly on the context above. If you don't know the answer, say you're not sure but they can book a call with Coriyon to discuss.
- If a user asks about starting or contacting, guide them to the "Book an intro call" button in the navigation bar.
`;

    const result = streamText({
      model: google('gemini-2.5-flash'),
      messages,
      system: DYNAMIC_SYSTEM_PROMPT,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("🔥 API Route Error:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}