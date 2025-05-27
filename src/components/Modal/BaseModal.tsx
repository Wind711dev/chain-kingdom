import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
export default function BaseModal({ isOpen, children, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Ngăn scroll nền
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset'; // Reset scroll khi unmount
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 z-[600] flex items-center justify-center bg-black/20 backdrop-blur-sm'
      onClick={onClose}
    >
      {children}
    </div>
  );
}
