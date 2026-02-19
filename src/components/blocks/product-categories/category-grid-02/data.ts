export interface CategoryItemData {
  title: string
  description?: string
  url?: string
  src: string
}

export const data: CategoryItemData[] = [
  {
    title: 'All dressed',
    description: `Dress that feels a little fany for when pajamas aren't cutting it`,
    src: 'https://images.unsplash.com/photo-1630759072462-d5348e577ee8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=872&q=80',
    url: '#',
  },
  {
    title: 'Topped off',
    src: 'https://images.unsplash.com/photo-1613521973937-efce73f2f943?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=930&q=80',
    url: '#',
  },
  {
    title: 'Go chic',
    src: 'https://images.unsplash.com/photo-1548306530-3ece53b754b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80',
    url: '#',
  },
]
