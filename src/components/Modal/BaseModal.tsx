interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
export default function BaseModal({ isOpen, children, onClose }: ModalProps) {
  return (
    <div
      style={{ display: !isOpen ? 'none' : 'flex' }}
      className='fixed inset-0 z-[600]'
      onClick={onClose}
    >
      <div className='relative w-full h-full'>
        <div className='absolute top-0 bottom-0 left-0 right-0 z-601 bg-black/20 backdrop-blur-sm'></div>
        <div className='absolute top-0 bottom-0 left-0 right-0 z-602 flex items-center justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
}
