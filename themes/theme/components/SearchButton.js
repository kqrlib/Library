"use client"

import { useSimpleGlobal } from ".."
import { siteConfig } from "@/lib/config"
import { useState } from "react"
import { useRouter } from "next/router"

/**
 * Search button component
 * @returns {JSX.Element}
 */
export default function SearchButton() {
  const [showSearchInput, setShowSearchInput] = useState(false)
  const router = useRouter()
  const { searchModal } = useSimpleGlobal()

  // Toggle search input or open search modal
  const toggleShowSearchInput = () => {
    if (siteConfig("ALGOLIA_APP_ID")) {
      searchModal.current.openSearch()
    } else {
      setShowSearchInput(!showSearchInput)
    }
  }

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      const search = document.getElementById("simple-search").value
      if (search) {
        router.push({ pathname: "/search/" + search })
      }
    }
  }

  return (
    <div className="relative">
      {showSearchInput && (
        <input
          autoFocus
          id="simple-search"
          onKeyUp={onKeyUp}
          className="absolute right-0 top-0 w-60 h-10 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 outline-none border border-gray-200 dark:border-gray-700"
          aria-label="Search"
          type="search"
          name="s"
          autoComplete="off"
          placeholder="Search and press enter..."
        />
      )}

      <button
        onClick={toggleShowSearchInput}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
        aria-label="Search"
      >
        <i
          className={
            showSearchInput
              ? "fa-regular fa-circle-xmark text-gray-600 dark:text-gray-300"
              : "fa-solid fa-magnifying-glass text-gray-600 dark:text-gray-300"
          }
        />
      </button>
    </div>
  )
}
