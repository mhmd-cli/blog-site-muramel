import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { url } = usePage();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const isActive = (path) => {
    if (path === '/') return url === path;
    return url.startsWith(path);
  };

  const navItems = ["Blog", "About", "Contact"];
  const categories = ["Technology", "Business", "Lifestyle", "Health"];

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300",
      !visible && "-translate-y-full"
    )}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-xl font-bold text-gray-900"
            onClick={() => setOpen(false)}
          >
            Muramel 
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="space-x-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/" className={cn(
                  navigationMenuTriggerStyle(),
                  isActive('/') && 'bg-gray-100',
                  "text-gray-900 hover:bg-gray-100"
                )}>
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-900 hover:bg-gray-100 data-[state=open]:bg-gray-100">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <li key={category}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/category/${category.toLowerCase()}`}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100",
                            isActive(`/category/${category.toLowerCase()}`) && 'bg-gray-100',
                            "text-gray-900"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{category}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                            Explore {category} articles
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {navItems.map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink asChild>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(`/${item.toLowerCase()}`) && 'bg-gray-100',
                      "text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    {item}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth buttons - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" className="text-gray-900">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gray-900 text-white hover:bg-gray-700">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" aria-label="Toggle menu">
              <Menu className="h-5 w-5 text-gray-900" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
            <nav className="flex flex-col gap-4 mt-8">
              <Link 
                href="/" 
                className={cn(
                  "text-lg font-medium text-gray-900 hover:text-gray-700",
                  isActive('/') && "text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              
              <details className="group">
                <summary className="flex items-center justify-between text-lg font-medium text-gray-900 hover:text-gray-700 cursor-pointer">
                  Categories
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 pl-4">
                  {categories.map((category) => (
                    <Link 
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      className={cn(
                        "block py-2 text-gray-600 hover:text-gray-900",
                        isActive(`/category/${category.toLowerCase()}`) && "text-primary"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </details>

              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className={cn(
                    "text-lg font-medium text-gray-900 hover:text-gray-700",
                    isActive(`/${item.toLowerCase()}`) && "text-primary"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full text-gray-900">
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-700">
                    Register
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};