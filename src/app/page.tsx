import Link from 'next/link';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}
