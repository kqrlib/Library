import LazyImage from "@/components/LazyImage"
import NotionIcon from "@/components/NotionIcon"
import NotionPage from "@/components/NotionPage"
import TwikooCommentCount from "@/components/TwikooCommentCount"
import { siteConfig } from "@/lib/config"
import { useGlobal } from "@/lib/global"
import { formatDateFmt } from "@/lib/utils/formatDate"
import Link from "next/link"
import CONFIG from "../config"

export const BlogItem = (props) => {
  const { post } = props
  const { NOTION_CONFIG } = useGlobal()
  const showPageCover = siteConfig("SIMPLE_POST_COVER_ENABLE", false, CONFIG)
  const showPreview = siteConfig("POST_LIST_PREVIEW", false, NOTION_CONFIG) && post.blockMap

  return (
    <div key={post.id} className="my-8 pb-12 border-b dark:border-gray-800">
      <div className="flex flex-col md:flex-row rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-white dark:bg-gray-800">
        {/* Image cover */}
        {showPageCover && post?.pageCoverThumbnail && (
          <div className="md:w-1/3 overflow-hidden">
            <Link href={post.href} passHref>
              <LazyImage
                src={post?.pageCoverThumbnail}
                className="w-full h-48 md:h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                alt={post.title}
              />
            </Link>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 p-6 ${showPageCover && post?.pageCoverThumbnail ? "md:w-2/3" : "w-full"}`}>
          {/* Title */}
          <h2 className="mb-3">
            <Link
              href={post.href}
              className="blog-item-title font-bold text-black dark:text-white text-2xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {siteConfig("POST_TITLE_ICON") && <NotionIcon icon={post.pageIcon} />}
              {post.title}
            </Link>
          </h2>

          {/* Post metadata */}
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-3 items-center">
            <span>
              <a
                href={siteConfig("SIMPLE_AUTHOR_LINK", null, CONFIG)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <i className="fa-regular fa-user mr-1"></i> {siteConfig("AUTHOR")}
              </a>
            </span>
            <span>
              <Link
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                href={`/archive#${formatDateFmt(post?.publishDate, "yyyy-MM")}`}
              >
                <i className="fa-regular fa-clock mr-1" /> {post.date?.start_date || post.createdTime}
              </Link>
            </span>
            <span>
              <TwikooCommentCount post={post} />
            </span>

            {post.category && (
              <Link
                href={`/category/${post.category}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <i className="fa-regular fa-folder mr-1" />
                {post.category}
              </Link>
            )}

            {post?.tags && post?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {post?.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tag/${t}`}
                    className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Post summary */}
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {!showPreview && (
              <>
                {post.summary}
                {post.summary && <span>...</span>}
              </>
            )}
            {showPreview && post?.blockMap && (
              <div className="overflow-hidden max-h-40">
                <NotionPage post={post} />
              </div>
            )}
          </div>

          {/* Continue reading button */}
          <div>
            <Link
              href={post.href}
              className="inline-block rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 transition-colors duration-200"
            >
              Continue Reading <i className="fa-solid fa-angle-right ml-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
