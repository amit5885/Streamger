import { useNavigate } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  path: string
}

export default function Pagination({ page, totalPages, path }: PaginationProps) {
  const navigate = useNavigate()
  
  // Limit total pages shown to avoid too many buttons
  const maxPages = 500
  const effectiveTotalPages = Math.min(totalPages, maxPages)

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > effectiveTotalPages) return
    
    navigate({
      to: path,
      search: { page: newPage },
    })
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex justify-center items-center gap-4 py-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Previous</span>
      </button>
      
      <span className="text-gray-300 font-medium">
        Page {page} of {effectiveTotalPages}
      </span>
      
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= effectiveTotalPages}
        className="flex items-center gap-1 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
