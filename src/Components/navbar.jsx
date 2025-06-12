/*eslint-disable*/
import Logo from "@/components/navbar-components/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../Context/userContext";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/pharmacy-locator", label: "Pharmacy Locator" },
  { href: "/barcode-scanner", label: "Barcode Scanner" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const { setUserData, userData } = useContext(userContext);
  let navigate = useNavigate();

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname === href;
  };

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2 w-full">
          <a href="#" className="text-primary hover:text-primary/90">
            <Logo />
          </a>
          {/* Center nav */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="h-full">
                    <NavigationMenuLink
                      active={isActiveLink(link.href)}
                      className="text-muted-foreground hover:text-[var(--primary-color)] border-b-primary hover:border-b-[var(--primary-color)] data-[active]:border-b-[var(--primary-color)] h-full justify-center rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-[var(--secondary-color)] hover:bg-opacity-20 transition-colors duration-200 data-[active]:bg-transparent!"
                      asChild
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          {userData ? (
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
