import { AdSlot } from "@/components/GoogleAdsense"
import Live2D from "@/components/Live2D"
import Announcement from "./Announcement"
import Catalog from "./Catalog"
import WWAds from "@/components/WWAds"

/**
 * Sidebar component with enhanced styling
 * @param {*} props
 * @returns {JSX.Element}
 */
export default function SideBar(props) {
  const { notice } = props
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
        <Catalog {...props} />
      </div>

      <Live2D />

      {notice && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
          <Announcement post={notice} />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
        <AdSlot />
      </div>

      <WWAds orientation="vertical" className="w-full rounded-2xl overflow-hidden" />
    </div>
  )
}
