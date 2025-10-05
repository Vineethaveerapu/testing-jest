'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  className?: string;
}

const pageLinks: { name: string; href: string }[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Our Services',
    href: '/our-services',
  },
  {
    name: 'Contact Us',
    href: '/contact-us',
  },
];

const Header = ({ className = '' }: HeaderProps) => {
  const pathname = usePathname();

  const isActive = (page: string) => {
    return page === pathname;
  };

  return (
    <header
      className={`${className} flex justify-between items-center gap-4 flex-wrap-reverse`}>
      <Image
        src="/logo.png"
        alt="logo"
        className="logo"
        width={50}
        height={50}
        priority
      />
      <nav className={`flex gap-4 flex-wrap-reverse text-xl`}>
        {pageLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`${
              isActive(link.href) ? 'underline underline-offset-4' : ''
            }`}>
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
