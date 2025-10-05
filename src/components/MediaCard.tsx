import Image from 'next/image';
import Link from 'next/link';

interface MediaCardProps {
  className?: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const MediaCard = ({
  className = '',
  title,
  description,
  image,
  link,
}: MediaCardProps) => {
  return (
    <div className={`${className} border-2 border-gray-300 rounded-md p-4`}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Image
        src={image}
        alt={title}
        width={100}
        height={100}
      />
      <Link href={link}>{link}</Link>
    </div>
  );
};

export default MediaCard;
