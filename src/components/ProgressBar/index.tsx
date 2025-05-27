import { memo } from 'react';
import './styles.scss';

interface IProgressBarProps {
  progress: number; // Progress value between 0 and 100
  className?: string;
  width?: string;
  height?: string;
}

function ProgressBar({ progress, className, height, width }: IProgressBarProps) {
  return (
    <div
      className={`progress-container ${className || ''}`}
      style={{ width: width, height: height }}
    >
      <div className='progress-fill' style={{ width: `${progress}%` }}></div>
    </div>
  );
}

function areEqual(prevProps: IProgressBarProps, nextProps: IProgressBarProps) {
  return (
    prevProps.progress === nextProps.progress &&
    prevProps.className === nextProps.className &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height
  );
}

export default memo(ProgressBar, areEqual);
