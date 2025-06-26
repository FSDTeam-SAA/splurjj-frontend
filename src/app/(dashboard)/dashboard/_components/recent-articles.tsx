import { Badge } from "@/components/ui/badge"

interface Article {
  id: string
  title: string
  author: string
  timeAgo: string
  status: "Published" | "Review" | "Cancel"
}

interface RecentArticlesProps {
  articles?: Article[]
}

const defaultArticles: Article[] = [
  { id: "1", title: "Headline Title Shown", author: "Rahim", timeAgo: "5 hours ago", status: "Published" },
  { id: "2", title: "Headline Title Shown", author: "Rahim", timeAgo: "5 hours ago", status: "Review" },
  { id: "3", title: "Headline Title Shown", author: "Rahim", timeAgo: "5 hours ago", status: "Cancel" },
  { id: "4", title: "Headline Title Shown", author: "Rahim", timeAgo: "5 hours ago", status: "Published" },
  { id: "5", title: "Headline Title Shown", author: "Rahim", timeAgo: "5 hours ago", status: "Published" },
]

export function RecentArticles({ articles = defaultArticles }: RecentArticlesProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-blue-50 text-blue-600 hover:bg-blue-50"
      case "Review":
        return "bg-blue-500 text-white hover:bg-blue-500"
      case "Cancel":
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-black mb-6">Recent Articles</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Gray rectangular placeholder exactly as shown */}
              <div className="w-12 h-12 bg-gray-300 rounded-md flex-shrink-0"></div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{article.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  By {article.author} • {article.timeAgo}
                </p>
              </div>
            </div>
            <Badge className={`${getStatusStyle(article.status)} px-3 py-1 text-xs font-medium rounded-md border-0`}>
              {article.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}
