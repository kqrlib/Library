"use client"

import { useState } from "react"
import MenuDrawer from "./MenuDrawer"

/**
 * Button to toggle the menu drawer
 * @returns {JSX.Element}
 */
export function MenuDrawerButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
        aria-label="Menu"
      >
        <i className="fa fa-bars text-gray-600 dark:text-gray-300" />
      </button>

      <MenuDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
