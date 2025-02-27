"use client";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navbar() {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-gray-900/90 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-blue-500/5" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center gap-2 group" 
              onClick={closeMenu}
            >
              <div className=" p-1.5 rounded-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg ">
                <Image
                src="/logo.png"
                alt="logo"
                width={30}
                height={30}
                priority
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                AutoViral<span className="text-blue-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-white/5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:gap-1">
            <Link
              href="/features"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              Features
            </Link>
            
            <Link
              href="/pricing"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              Pricing
            </Link>
            
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
            >
              Docs
            </Link>
            
            {userId && (
              <Link
                href="/generate"
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-all duration-300 hover:scale-105"
              >
                Dashboard
              </Link>
            )}
            
            <div className="h-6 mx-2 border-l border-gray-700/50" />
            
            {/* Auth Buttons */}
            <SignedOut>
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors hover:bg-white/5 rounded-lg">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 hover:scale-105">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full hover:scale-110 transition-transform duration-300",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`sm:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[32rem]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          <Link
            href="/features"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            onClick={closeMenu}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            onClick={closeMenu}
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
            onClick={closeMenu}
          >
            Docs
          </Link>
          
          {userId && (
            <Link
              href="/generate"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
              onClick={closeMenu}
            >
              Dashboard
            </Link>
          )}
          
          <div className="border-t border-gray-800/50 my-3" />
          
          {/* Mobile Auth Buttons */}
          <SignedOut>
            <div className="flex flex-col gap-2 mt-4 px-3">
              <SignInButton mode="modal">
                <button 
                  className="w-full py-2 text-center text-sm font-medium text-white border border-gray-700/50 rounded-xl hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 rounded-xl text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40"
                  onClick={closeMenu}
                >
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="px-3 py-2 flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonTrigger: "focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full",
                  },
                }}
                afterSignOutUrl="/"
              />
              <span className="ml-3 text-sm text-gray-400">Manage account</span>
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}