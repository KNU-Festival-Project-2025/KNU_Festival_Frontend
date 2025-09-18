import React from 'react';

interface RefButtonProps {
  text: string;
  backgroundColor: string;
  onClick: () => void;
}

export const RefButton: React.FC<RefButtonProps> = ({ text, backgroundColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[150px] h-[42px] flex-shrink-0 rounded-[100px] text-white font-hahmlet text-[17px] font-semibold leading-[22px]"
      style={{
        background: backgroundColor,
        boxShadow: '1px 4px 5.2px 3px rgba(61,98,23,0.43), 0 4px 10.7px 5px rgba(243,243,243,0.55) inset',
      }}
    >
      {text}
    </button>
  );
};
