"use client"

import { AdSlot } from "@/components/GoogleAdsense"
import replaceSearchResult from "@/components/Mark"
import NotionPage from "@/components/NotionPage"
import { siteConfig } from "@/lib/config"
import { useGlobal } from "@/lib/global"
import { isBrowser } from "@/lib/utils"
import { Transition } from "@headlessui/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useRef } from "react"
import BlogPostBar from "./components/BlogPostBar"
import CONFIG from "./config"
import { Style } from "./style"

const AlgoliaSearchModal = dynamic(() => import("@/components/AlgoliaSearchModal"), { ssr: false })

// Theme components
const BlogListScroll = dynamic(() => import("./components/BlogListScroll"), {
  ssr: false,
})
const BlogArchiveItem = dynamic(() => import("./components/BlogArchiveItem"), {
  ssr: false,
})
const ArticleLock = dynamic(() => import("./components/ArticleLock"), {
  ssr: false,
})
const ArticleInfo = dynamic(() => import("./components/ArticleInfo"), {
  ssr: false,
})
const Comment = dynamic(() => import("@/components/Comment"), { ssr: false })
const ArticleAround = dynamic(() => import("./components/ArticleAround"), {
  ssr: false,
})
const ShareBar = dynamic(() => import("@/components/ShareBar"), { ssr: false })
const Header = dynamic(() => import("./components/Header"), { ssr: false })
const SideBar = dynamic(() => import("./components/SideBar"), { ssr: false })
const JumpToTopButton = dynamic(() => import("./components/JumpToTopButton"), {
  ssr: false,
})
const Footer = dynamic(() => import("./components/Footer"), { ssr: false })
const SearchInput = dynamic(() => import("./components/SearchInput"), {
  ssr: false,
})
const WWAds = dynamic(() => import("@/components/WWAds"), { ssr: false })
const BlogListPage = dynamic(() => import("./components/BlogListPage"), {
  ssr: false,
})
const RecommendPosts = dynamic(() => import("./components/RecommendPosts"), {
  ssr: false,
})

// Theme global state
const ThemeGlobalSimple = createContext()
export const useSimpleGlobal = () => useContext(ThemeGlobalSimple)

/**
 * Base layout
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutBase = (props) => {
  const { children, slotTop } = props
  const { onLoading, fullWidth } = useGlobal()
  const searchModal = useRef(null)

  return (
    <ThemeGlobalSimple.Provider value={{ searchModal }}>
      <div
        id="theme-simple"
        className={`${siteConfig("FONT_STYLE")} min-h-screen flex flex-col dark:text-gray-300 bg-gray-50 dark:bg-gray-900 scroll-smooth`}
      >
        <Style />

        {/* Header */}
        <Header {...props} />

        {/* Main content */}
        <div
          id="container-wrapper"
          className={
            (JSON.parse(siteConfig("LAYOUT_SIDEBAR_REVERSE")) ? "flex-row-reverse" : "") +
            " w-full flex-1 flex items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
          }
        >
          <div id="container-inner" className="w-full flex-grow min-h-fit">
            <Transition
              show={!onLoading}
              appear={true}
              enter="transition ease-in-out duration-700 transform order-first"
              enterFrom="opacity-0 translate-y-16"
              enterTo="opacity-100"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-16"
              unmount={false}
            >
              {slotTop}

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">{children}</div>
            </Transition>
            <AdSlot type="native" />
          </div>

          {fullWidth ? null : (
            <div id="right-sidebar" className="hidden xl:block flex-none sticky top-28 w-80 pl-8">
              <SideBar {...props} />
            </div>
          )}
        </div>

        <div className="fixed right-4 bottom-4 z-20">
          <JumpToTopButton />
        </div>

        {/* Search modal */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />

        <Footer {...props} />
      </div>
    </ThemeGlobalSimple.Provider>
  )
}

/**
 * Blog index page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutIndex = (props) => {
  return <LayoutPostList {...props} />
}

/**
 * Blog list page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutPostList = (props) => {
  return (
    <>
      <BlogPostBar {...props} />
      {siteConfig("POST_LIST_STYLE") === "page" ? <BlogListPage {...props} /> : <BlogListScroll {...props} />}
    </>
  )
}

/**
 * Search page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutSearch = (props) => {
  const { keyword } = props

  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById("posts-wrapper"),
        search: keyword,
        target: {
          element: "span",
          className: "text-red-500 border-b border-dashed",
        },
      })
    }
  }, [])

  const slotTop = siteConfig("ALGOLIA_APP_ID") ? null : <SearchInput {...props} />

  return <LayoutPostList {...props} slotTop={slotTop} />
}

/**
 * Archive page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props
  return (
    <>
      <div className="mb-10 pb-20 md:py-12 p-3 min-h-screen w-full">
        {Object.keys(archivePosts).map((archiveTitle) => (
          <BlogArchiveItem key={archiveTitle} archiveTitle={archiveTitle} archivePosts={archivePosts} />
        ))}
      </div>
    </>
  )
}

/**
 * Article detail page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutSlug = (props) => {
  const { post, lock, validPassword, prev, next, recommendPosts } = props
  const { fullWidth } = useGlobal()

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <div className={`px-2 ${fullWidth ? "" : "xl:max-w-4xl 2xl:max-w-6xl"}`}>
          {/* Article info */}
          <ArticleInfo post={post} />

          {/* Ads */}
          <WWAds orientation="horizontal" className="w-full rounded-xl overflow-hidden my-6" />

          <div id="article-wrapper" className="mt-6">
            {/* Notion article content */}
            {!lock && <NotionPage post={post} />}
          </div>

          {/* Share */}
          <ShareBar post={post} />

          {/* Ads */}
          <AdSlot type={"in-article"} />

          {post?.type === "Post" && (
            <>
              <ArticleAround prev={prev} next={next} />
              <RecommendPosts recommendPosts={recommendPosts} />
            </>
          )}

          {/* Comments */}
          <Comment frontMatter={post} />
        </div>
      )}
    </>
  )
}

/**
 * 404 page
 * @param {*} props
 * @returns {JSX.Element}
 */
const Layout404 = (props) => {
  const { post } = props
  const router = useRouter()
  const waiting404 = siteConfig("POST_WAITING_TIME_FOR_404") * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector("#article-wrapper #notion-article")
          if (!article) {
            router.push("/404").then(() => {
              console.warn("Page not found", router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
      >
        Return Home
      </Link>
    </div>
  )
}

/**
 * Category index page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  return (
    <>
      <div id="category-list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categoryOptions?.map((category) => {
          return (
            <Link key={category.name} href={`/category/${category.name}`} passHref>
              <div className="bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                <div className="flex items-center">
                  <i className="mr-3 fas fa-folder text-blue-500" />
                  <span className="text-gray-800 dark:text-gray-200 font-medium">{category.name}</span>
                  <span className="ml-auto bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

/**
 * Tag index page
 * @param {*} props
 * @returns {JSX.Element}
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  return (
    <>
      <div id="tags-list" className="flex flex-wrap gap-3">
        {tagOptions.map((tag) => {
          return (
            <Link
              key={tag.name}
              href={`/tag/${encodeURIComponent(tag.name)}`}
              passHref
              className={`bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-center">
                <i className="mr-2 fas fa-tag text-blue-500" />
                <span className="text-gray-800 dark:text-gray-200">{tag.name}</span>
                {tag.count && (
                  <span className="ml-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {tag.count}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG,
}
