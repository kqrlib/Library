import { BeiAnGongAn } from "@/components/BeiAnGongAn"
import DarkModeButton from "@/components/DarkModeButton"
import { siteConfig } from "@/lib/config"

/**
 * Enhanced footer with modern styling
 * @returns {JSX.Element}
 */
export default function Footer(props) {
  const d = new Date()
  const currentYear = d.getFullYear()
  const since = siteConfig("SINCE")
  const copyrightDate = Number.parseInt(since) < currentYear ? since + "-" + currentYear : currentYear

  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-16 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteConfig("AUTHOR")}</h3>
            <p className="text-gray-400 mb-4">{siteConfig("DESCRIPTION")}</p>

            {/* Social links */}
            <div className="flex space-x-4 text-xl">
              {siteConfig("CONTACT_GITHUB") && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  href={siteConfig("CONTACT_GITHUB")}
                  className="hover:text-white transition duration-200"
                >
                  <i className="fab fa-github" />
                </a>
              )}
              {siteConfig("CONTACT_TWITTER") && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter"
                  href={siteConfig("CONTACT_TWITTER")}
                  className="hover:text-white transition duration-200"
                >
                  <i className="fab fa-twitter" />
                </a>
              )}
              {siteConfig("CONTACT_EMAIL") && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  title="Email"
                  href={`mailto:${siteConfig("CONTACT_EMAIL")}`}
                  className="hover:text-white transition duration-200"
                >
                  <i className="fas fa-envelope" />
                </a>
              )}
              {JSON.parse(siteConfig("ENABLE_RSS")) && (
                <a
                  target="_blank"
                  rel="noreferrer"
                  title="RSS"
                  href="/rss/feed.xml"
                  className="hover:text-white transition duration-200"
                >
                  <i className="fas fa-rss" />
                </a>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col md:items-end">
            <div className="mb-4 flex items-center space-x-2">
              <span>Dark Mode</span>
              <DarkModeButton />
            </div>

            <div className="text-sm text-gray-400">
              &copy; {copyrightDate} {siteConfig("AUTHOR")}. All rights reserved.
            </div>

            <div className="mt-2 text-xs text-gray-500">
              {siteConfig("BEI_AN") && (
                <a href={siteConfig("BEI_AN_LINK")} className="hover:text-gray-300 transition duration-200">
                  {siteConfig("BEI_AN")}
                </a>
              )}
              <BeiAnGongAn />
              <span className="ml-2">
                Powered by
                <a
                  href="https://github.com/tangly1024/NotionNext"
                  className="ml-1 hover:text-gray-300 transition duration-200"
                >
                  NotionNext {siteConfig("VERSION")}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
