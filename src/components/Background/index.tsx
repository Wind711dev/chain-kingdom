import type React from 'react';
import './styles.scss';

interface IBackgroundProps {
  children: React.ReactNode;
}

export default function Background({ children }: IBackgroundProps) {
  return (
    <div className='background-container'>
      <div className='h-[300%] w-[300%]'>{children}</div>
    </div>
  );
}
