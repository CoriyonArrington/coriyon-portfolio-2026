'use client';

import dynamic from 'next/dynamic';
import { useColorMode } from '@/components/ui/color-mode';
import { useEffect, useState } from 'react';

// Dynamically import PopupModal to completely disable SSR and hydration errors
const PopupModal = dynamic(
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

  // Ensure we only render this strictly on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // These hex codes (without the #) control the INTERNAL colors of the calendar card itself
  const isDark = colorMode === 'dark';
  const bgColor = isDark ? '000000' : 'ffffff'; 
  const textColor = isDark ? 'ffffff' : '1a202c';
  const primaryColor = '2f855a';

  return (
    <>
      <style>{`
        /* Forces the outer wrappers to be completely transparent so the card floats cleanly */
        .calendly-overlay .calendly-popup,
        .calendly-overlay .calendly-popup-content,
        .calendly-overlay iframe {
          color-scheme: light !important; /* Continues to prevent the browser's white-flash */
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