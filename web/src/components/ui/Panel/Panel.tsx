import { classNames } from '@/utils';
import React from 'react';

interface PanelProps {
  title?: string;
  children: React.ReactNode;
  rightComponent?: React.ReactNode;
  className?: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, rightComponent, className }) => {
  return (
    <div className={classNames("bg-gray-100 rounded-lg p-8 w-full", className)}>
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg text-gray-600">{title}</h2>
          {rightComponent && <div>{rightComponent}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Panel;
