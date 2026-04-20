import { supabase } from "@/lib/supabase"
import { cache } from "react"
import { CtaClient } from "./client"

// React cache deduplicates this request. If the page already fetched 'home', this costs 0 extra database hits!
const getGlobalContactInfo = cache(async () => {
  const { data } = await supabase.from('pages').select('content_en').eq('slug', 'home').maybeSingle()
  return data?.content_en?.footer?.contact_info || {}
})

interface CtaBlockProps {
  dict?: any;
}

export const Block = async ({ dict }: CtaBlockProps) => {
  const contactInfo = await getGlobalContactInfo()
  
  return <CtaClient dict={dict} contactInfo={contactInfo} />
}