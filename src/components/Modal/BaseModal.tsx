
interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}
export default function BaseModal({ isOpen, children, onClose }: ModalProps) {
  return (
    <div
      style={{ display: !isOpen ? 'none' : 'flex' }}
      className='fixed inset-0 z-[600] flex items-center justify-center bg-black/20 backdrop-blur-sm'
      onClick={onClose}
    >
      {children}
    </div>
  );
}
