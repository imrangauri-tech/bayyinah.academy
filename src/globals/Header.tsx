"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { HeaderNavItemTypes } from "@/types";
import { ChevronDown, X } from "lucide-react";

const HEADER_NAV_ITEMS: HeaderNavItemTypes[] = [
  {
    label: "Courses",
    url: "/courses",
  },
  {
    label: "Pricing",
    url: "/pricing",
  },
  {
    label: "Resources",
    subItems: [
      { label: "Blog", url: "/blogs" },
      { label: "About Us", url: "/about-us" },
      { label: "Teachers", url: "/our-teachers" },
      { label: "Careers", url: "/career" },
    ],
  },
];

const MainHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleResources = () => {
    setIsResourcesExpanded(!isResourcesExpanded);
  };

  return (
    <header aria-label="Main site header" className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-24 py-1">
          <div className="flex items-center flex-shrink-0 w-55">
            <Link href="/" className="flex items-center w-full transition-transform duration-300 ease-out hover:scale-105 transform">
              <Image
                src="/Bayyinah Logo.webp"
                width={620}
                height={190}
                alt="Bayyinah logo"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div aria-describedby="header-nav-lists" className="h-full flex-1 items-center justify-end hidden lg:flex">
            <ul className="flex items-center gap-12 h-full">
              {HEADER_NAV_ITEMS.map((nav) => (
                <React.Fragment key={nav.label}>
                  {nav.subItems ? (
                    <React.Fragment>
                      <li
                        aria-describedby="header-nav-item"
                        className="relative group/nav-item flex items-center h-full"
                      >
                        <span className="flex h-full items-center justify-center gap-x-1 text-xl font-medium text-neutral-900 cursor-pointer group-hover/nav-item:text-regal-blue-600 transition-all duration-300 ease-out">
                          {nav.label}
                          <ChevronDown className="transition-transform ease-in-out duration-300 group-hover/nav-item:-rotate-180" />
                        </span>

                        {/* sub menu */}
                        <ul className="absolute top-full z-50 right-0 shadow-sm p-2 space-y-2 bg-white border border-gray-300 invisible opacity-0 group-hover/nav-item:h-auto group-hover/nav-item:w-max group-hover/nav-item:visible group-hover/nav-item:opacity-100 transition-all ease-in-out duration-300 group-hover/nav-item:-translate-y-5">
                          {nav.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <Link 
                                href={subItem.url || "#"}
                                className="block px-3 py-2 rounded-md transition-all duration-200 ease-out hover:bg-gray-100 hover:scale-105 transform"
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </React.Fragment>
                  ) : (
                    <li className="flex items-center h-full">
                      <Link 
                        href={nav.url || '#'} 
                        className="text-xl h-full font-medium text-neutral-900 flex items-center justify-center transition-all duration-300 ease-out hover:text-regal-blue-600 hover:scale-105 transform"
                      >
                        {nav.label}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="relative p-3 rounded-lg bg-white border border-gray-200 text-neutral-700 hover:text-regal-blue-600 hover:bg-gray-50 hover:border-regal-blue-300 hover:shadow-md transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-regal-blue-500 focus:ring-offset-2"
              aria-label="Toggle mobile menu"
            >
              <div className="flex flex-col items-center justify-center w-5 h-5">
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <>
                    <span className={`block w-5 h-0.5 bg-current mb-1 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-current mb-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                  </>
                )}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {HEADER_NAV_ITEMS.map((nav) => (
                <React.Fragment key={nav.label}>
                  {nav.subItems ? (
                    <div className="space-y-1">
                      <button
                        onClick={toggleResources}
                        className="w-full text-left px-3 py-2 text-lg font-medium text-neutral-900 hover:text-regal-blue-600 hover:bg-gray-50 rounded-md transition-all duration-200 flex items-center justify-between"
                      >
                        {nav.label}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isResourcesExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {isResourcesExpanded && (
                        <div className="pl-4 space-y-1">
                          {nav.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.url || "#"}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-3 py-2 text-base text-neutral-700 hover:text-regal-blue-600 hover:bg-gray-50 rounded-md transition-all duration-200"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={nav.url || '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-lg font-medium text-neutral-900 hover:text-regal-blue-600 hover:bg-gray-50 rounded-md transition-all duration-200"
                    >
                      {nav.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
