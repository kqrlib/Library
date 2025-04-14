"use client"

import { useGlobal } from "@/lib/global"
import { siteConfig } from "@/lib/config"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import CONFIG from "../config"
import DarkModeButton from "@/components/DarkModeButton"

/**
 * Sidebar menu drawer component
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @returns {JSX.Element}
 */
export default function MenuDrawer({ isOpen, onClose, customNav, customMenu }) {
  const { locale } = useGlobal()
  const router = useRouter()

  // Close menu on route change
  useEffect(() => {
    router.events.on("routeChangeStart", onClose)
    return () => {
      router.events.off("routeChangeStart", onClose)
    }
  }, [router.events, onClose])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  // Default menu links
  let links = [
    {
      icon: "fas fa-search",
      name: locale.NAV.SEARCH,
      href: "/search",
      show: siteConfig("SIMPLE_MENU_SEARCH", null, CONFIG),
    },
    {
      icon: "fas fa-archive",
      name: locale.NAV.ARCHIVE,
      href: "/archive",
      show: siteConfig("SIMPLE_MENU_ARCHIVE", null, CONFIG),
    },
    {
      icon: "fas fa-folder",
      name: locale.COMMON.CATEGORY,
      href: "/category",
      show: siteConfig("SIMPLE_MENU_CATEGORY", null, CONFIG),
    },
    {
      icon: "fas fa-tag",
      name: locale.COMMON.TAGS,
      href: "/tag",
      show: siteConfig("SIMPLE_MENU_TAG", null, CONFIG),
    },
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // If custom menu is enabled, override the default menu
  if (siteConfig("CUSTOM_MENU")) {
    links = customMenu
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            aria-label="Close menu"
          >
            <i className="fa fa-times text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Menu links */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          <div className="py-4">
            {links
              ?.filter((link) => link.show !== false)
              .map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
                >
                  {link.icon && <i className={`${link.icon} w-6`} />}
                  <span className="ml-2">{link.name}</span>
                  {link.subMenus && link.subMenus.length > 0 && <i className="fa fa-chevron-right ml-auto" />}
                </Link>
              ))}
          </div>

          {/* Dark mode toggle */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-200">Dark Mode</span>
              <DarkModeButton />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
