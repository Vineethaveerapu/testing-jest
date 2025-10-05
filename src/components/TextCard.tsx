interface TextCardProps {
  className?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const TextCard = ({ className = '', title, children }: TextCardProps) => {
  return (
    <div className={`${className} border-2 border-gray-300 rounded-md p-4`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default TextCard;
