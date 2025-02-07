import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="flex-1">
          <nav className="hidden md:flex items-center justify-center">
            <h1 className="text-xl font-bold text-primary">Al-Quran Digital</h1>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="grid gap-4 py-4">
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  Beranda
                </Button>
              </Link>
              {/* Add more navigation items as needed */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
