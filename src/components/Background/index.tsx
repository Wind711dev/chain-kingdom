import type React from 'react';
import './styles.scss';

interface IBackgroundProps {
  children: React.ReactNode;
  overflowHidden?: boolean;
}

export default function Background({ children, overflowHidden }: IBackgroundProps) {
  return (
    <div className='background-container' style={{ overflow: overflowHidden ? 'hidden' : 'auto' }}>
      <div className='h-[300%] w-[300%]'>{children}</div>
    </div>
  );
}
