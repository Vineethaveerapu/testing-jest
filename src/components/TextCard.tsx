interface TextCardProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const TextCard = ({ className = '', title, children }: TextCardProps) => {
  return (
    <div
      className={`${className} text-center p-8 bg-gray-50 rounded-lg transition-transform duration-300 ease-in-out`}>
      <h2 className="text-blue-600 mb-4 text-2xl font-bold">{title}</h2>
      <div className="text-gray-600 my-2 text-lg">{children}</div>
    </div>
  );
};

export default TextCard;
