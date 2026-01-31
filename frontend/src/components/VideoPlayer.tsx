import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { Video } from '@/types'

interface VideoPlayerProps {
  video: Video | null
  onClose: () => void
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose()
      }
    }

    if (video) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [video, onClose])

  if (!video) return null

  const embedUrl =
    video.site === 'YouTube'
      ? `https://www.youtube.com/embed/${video.key}?autoplay=1`
      : null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl mx-4 animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors cursor-pointer"
          aria-label="Close video player"
        >
          <X size={32} />
        </button>

        {/* Video title */}
        <div className="mb-4 text-white">
          <h2 className="text-2xl font-bold">{video.name}</h2>
          <p className="text-sm text-gray-400">{video.type}</p>
        </div>

        {/* Video player */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              <p>Video not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
