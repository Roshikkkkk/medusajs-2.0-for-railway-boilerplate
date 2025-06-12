"use client"

import { useState, useEffect } from "react"

export default function NewNav() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    if (isNavOpen && window.matchMedia("(max-width: 639px)").matches) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isNavOpen])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <button
                onClick={toggleNav}
                className="text-ui-fg-base hover:text-ui-fg-interactive px-4 py-2"
                data-testid="nav-toggle-button"
              >
                {isNavOpen ? "Close" : "Menu"}
              </button>
            </div>
          </div>

          <div className="flex items-center h-full">
            <a
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Torgash Store
            </a>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <a
                  className="hover:text-ui-fg-base"
                  href="/search"
                  data-testid="nav-search-link"
                >
                  Search
                </a>
              )}
              <a
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </a>
              <a
                className="hover:text-ui-fg-base flex gap-2"
                href="/cart"
                data-testid="nav-cart-link"
              >
                Cart (0)
              </a>
            </div>
          </div>
        </nav>
        <div
          className={`absolute top-16 left-0 right-0 bg-white border-b border-ui-border-base z-50 p-4 text-ui-fg-base h-screen sm:h-[500px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isNavOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-y-2">
            <li>
              <a href="/products" className="hover:text-ui-fg-interactive">
                Products
              </a>
            </li>
            <li>
              <a href="/categories" className="hover:text-ui-fg-interactive">
                Categories
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-ui-fg-interactive">
                About
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  )
}