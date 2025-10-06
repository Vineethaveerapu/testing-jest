import type { TextCardProps } from '@/types';

const TextCard = ({ className = '', title, children }: TextCardProps) => {
  return (
    <div
      className={`${className} text-center p-8 bg-gray-50 rounded-lg transition-transform duration-300 ease-in-out`}>
      {title && (
        <h4 className="text-blue-600 mb-4 text-2xl font-bold">{title}</h4>
      )}
      {children && <div className="text-gray-600 my-2 text-lg">{children}</div>}
    </div>
  );
};

export default TextCard;
