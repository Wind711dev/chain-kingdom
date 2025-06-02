import type React from 'react';
import './styles.scss';

interface IBackgroundProps {
  children: React.ReactNode;
  overflowHidden?: boolean;
  onClick?: () => void;
}

export default function Background({ children, overflowHidden, onClick }: IBackgroundProps) {
  return (
    <div className='background-container' style={{ overflow: overflowHidden ? 'hidden' : 'auto' }}>
      <div className='h-[300%] w-[300%]' onClick={onClick}>
        {children}
      </div>
    </div>
  );
}
