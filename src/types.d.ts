declare module '@lottiefiles/dotlottie-react' {
  export const DotLottieReact: React.ComponentType<{
    src: string;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
  }>;
}

declare module 'react-calendly' {
  export const PopupModal: React.ComponentType<{
    url: string;
    pageSettings?: {
      backgroundColor?: string;
      hideEventTypeDetails?: boolean;
      hideLandingPageDetails?: boolean;
      primaryColor?: string;
      textColor?: string;
    };
    onModalClose?: () => void;
    open: boolean;
    rootElement: HTMLElement | null;
  }>;
}

declare module 'react-markdown';
declare module 'remark-gfm';