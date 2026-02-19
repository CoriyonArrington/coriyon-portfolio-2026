export interface CategoryItemData {
  title: string
  description: string
  src: string
  url: string
  currency: string
  price: number
  priceOverride: number
}

export interface CategoryData {
  title: string
  src: string
  description: string
  links: Array<{ title: string; url: string }>
  items: CategoryItemData[]
}

export const data: CategoryData = {
  title: 'Up to 50% off',
  src: 'https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'Shop the best deals on our website',
  links: [
    { title: 'Men Sale', url: '#' },
    { title: 'Women Sale', url: '#' },
  ],
  items: [
    {
      title: 'Running Shoes',
      description: 'Mustard Red',
      src: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: '#',
      currency: 'USD',
      price: 160,
      priceOverride: 64,
    },
    {
      title: 'White Sneakers',
      description: 'Dark Grey Sneakers',
      src: 'https://images.unsplash.com/photo-1579446565308-427218a2c60e?q=80&w=2225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: '#',
      currency: 'USD',
      price: 110,
      priceOverride: 78,
    },
    {
      title: 'Orange Sneakers',
      description: 'Fits for Sports',
      src: 'https://images.unsplash.com/photo-1600185365778-7875a359b924?q=80&w=2225&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: '#',
      currency: 'USD',
      price: 145,
      priceOverride: 87,
    },
    {
      title: 'Summer Shoes',
      description: 'Light and breezy',
      src: 'https://images.unsplash.com/photo-1680254418548-02c8ac7ffb6c?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      url: '#',
      currency: 'USD',
      price: 130,
      priceOverride: 65,
    },
  ],
}
