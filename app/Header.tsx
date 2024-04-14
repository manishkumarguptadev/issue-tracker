"use client";

import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "@/components/ui/button";
const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues" },
];
function Header() {
  const currentPath = usePathname();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-8">
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
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/api/auth/signin">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/api/auth/signout">Sign Out</Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
