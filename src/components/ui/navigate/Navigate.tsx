'use client';

import cn from '@/utils/common/cn';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

type NavigateProps = {
  mode: 'before' | 'after';
  onClick: () => void;
  className?: string;
};

const Navigate: React.FC<NavigateProps> = ({ mode, onClick, className }) => {
  return (
    <div
      className={cn(
        'absolute flex items-center justify-center w-9 h-9 text-black hover:text-primary-color-400 z-50',
        mode === 'before'
          ? '-left-[15px] top-[60%] -translate-y-[50%]'
          : '-right-[15px] top-[60%] -translate-y-[50%]',
        className,
      )}
    >
      <button
        className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-md"
        onClick={onClick}
      >
        {mode === 'before' ? <MdNavigateBefore /> : <MdNavigateNext />}
      </button>
    </div>
  );
};

export default Navigate;
