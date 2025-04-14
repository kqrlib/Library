import Link from "next/link"
import { siteConfig } from "@/lib/config"
import LazyImage from "@/components/LazyImage"
import { MenuDrawerButton } from "./MenuDrawerButton"
import SearchButton from "./SearchButton"

/**
 * Modern sticky header with blur effect
 * @returns {JSX.Element}
 */
export default function Header(props) {
  const { siteInfo } = props

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex justify-between items-center h-20 px-6 max-w-9/10 mx-auto">
        {/* Logo and site title */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition duration-200">
          <div className="flex-shrink-0">
            <LazyImage
              priority={true}
              src={siteInfo?.icon}
              className="rounded-full w-10 h-10"
              width={40}
              height={40}
              alt={siteConfig("AUTHOR")}
            />
          </div>
          <div className="font-serif text-xl font-medium dark:text-white">{siteConfig("AUTHOR")}</div>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <SearchButton />
          <MenuDrawerButton />
        </div>
      </div>
    </header>
  )
}
