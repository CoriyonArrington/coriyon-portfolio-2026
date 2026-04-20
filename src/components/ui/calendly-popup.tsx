'use client';

import dynamic from 'next/dynamic';
import { useColorMode } from '@/components/ui/color-mode';
import { useEffect, useState } from 'react';

interface PopupModalProps {
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
}

const PopupModal = dynamic<PopupModalProps>(
  () => import('react-calendly').then((mod) => mod.PopupModal),
  { ssr: false }
);

interface CalendlyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendlyPopup({ isOpen, onClose }: CalendlyPopupProps) {
  const { colorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  const isDark = colorMode === 'dark';
  const bgColor = isDark ? '000000' : 'ffffff'; 
  const textColor = isDark ? 'ffffff' : '1a202c';
  const primaryColor = '2f855a';

  return (
    <>
      <style>{`
        .calendly-overlay .calendly-popup,
        .calendly-overlay .calendly-popup-content,
        .calendly-overlay iframe {
          color-scheme: light !important; 
          background: transparent !important;
          background-color: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }
      `}</style>
      
      <PopupModal
        url="https://calendly.com/coriyonarrington/intro-call"
        pageSettings={{
          backgroundColor: bgColor,
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: primaryColor,
          textColor: textColor,
        }}
        onModalClose={onClose}
        open={isOpen}
        rootElement={document.body}
      />
    </>
  );
}