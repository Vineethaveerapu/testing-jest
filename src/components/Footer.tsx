import Link from "next/link";
import type { BaseComponentProps } from "@/types";

const Footer = ({ className = "" }: BaseComponentProps) => {
  return (
    <footer className={`${className} space-y-6`}>
      <div className="flex justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">About Us</h3>
          <p className="max-w-md">
            We are dedicated to providing the best gardening solutions
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Contact Info</h3>
          <ul className="list-none list-inside">
            <li>Email: info@urbanmali.com</li>
            <li>Phone: 077 1234567</li>
            <li>Address: 123 Garden Street</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Follow Us</h3>
          <nav className="flex flex-col">
            <Link href="/facebook" className="text-blue-500">
              Facebook
            </Link>
            <Link href="/instagram" className="text-blue-500">
              Instagram
            </Link>
            <Link href="/twitter" className="text-blue-500">
              Twitter
            </Link>
          </nav>
        </div>
      </div>

      <div className="text-center border-t-2 border-gray-300 py-4">
        <p>&copy; 2025 Garden. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
