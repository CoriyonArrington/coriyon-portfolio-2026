import { Logo1, Logo2 } from './logo-ipsum'

export type TestimonialData = {
  logo?: React.ReactNode
  quote: string
  author: string
  title: string
  company: string
  avatar: string
}

export const testimonials: TestimonialData[] = [
  {
    logo: <Logo1 />,
    quote:
      'The platform has streamlined our workflow significantly. What used to take hours now takes minutes, and the automated features have reduced our manual workload by 80%.',
    author: 'Sarah Chen',
    title: 'CEO',
    company: 'Lorem Ipsum',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    quote:
      'Implementation was incredibly smooth. The documentation is clear, and we were able to integrate the solution into our existing stack within days, not weeks.',
    author: 'Marcus Rodriguez',
    title: 'CEO',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    quote:
      'The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that have measurably improved our customer satisfaction.',
    author: 'Emma Thompson',
    title: 'CEO',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    quote:
      'Security was our top concern, and this solution exceeded our expectations. The enterprise-grade features and compliance standards give us complete peace of mind.',
    author: 'Raj Patel',
    title: 'CEO',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    quote:
      'The ROI has been incredible. Not only have we reduced operational costs, but our team productivity has increased dramatically since implementation.',
    author: 'Lisa Anderson',
    title: 'CEO',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    quote:
      'The scalability of the platform is remarkable. As our user base grew from thousands to millions, the performance remained consistently excellent.',
    author: 'David Foster',
    title: 'VP Engineering',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    logo: <Logo2 />,
    quote:
      "Customer support has been exceptional. Any time we've had questions, the response has been quick and thorough. It's rare to find this level of service.",
    author: 'Michael Chang',
    title: 'CTO',
    company: 'Lorem Company',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
]
