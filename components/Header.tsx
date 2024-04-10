"use client";

import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];
function Header() {
  const currentPath = usePathname();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-8">
      <nav className="flex gap-12 text-base font-medium ">
        <Link href="/">
          <Bug className="h-6 w-6" />
        </Link>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              link.href === currentPath
                ? "text-foreground "
                : "text-muted-foreground "
            } transition-colors hover:text-foreground`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
