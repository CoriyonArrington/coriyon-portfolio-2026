'use client'

import dynamic from 'next/dynamic'

interface LottiePlayerProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

const LottiePlayer = dynamic<LottiePlayerProps>(
  () => import('@lottiefiles/dotlottie-react').then(mod => mod.DotLottieReact),
  { ssr: false }
)

export const ErrorLottie = () => {
  return (
    <LottiePlayer
      src="https://kkegducuyzwdmxlzhxcm.supabase.co/storage/v1/object/public/images/animations/error-404.lottie"
      loop
      autoplay
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        inset: 0,
        objectFit: 'contain'
      }}
    />
  )
}