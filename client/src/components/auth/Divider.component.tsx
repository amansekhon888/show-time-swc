import React from "react";

interface DividerProps {
  text?: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  if (text) {
    return (
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-slate-700 to-transparent" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 px-2">
          {text}
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-gray-300 dark:from-slate-700 to-transparent" />
      </div>
    );
  }

  return (
    <div className="my-6 h-px bg-gradient-to-r from-gray-300 dark:from-slate-700 via-gray-300 dark:via-slate-700 to-gray-300 dark:to-slate-700" />
  );
};

export default Divider;
