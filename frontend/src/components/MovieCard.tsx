import { useState } from 'react'
import { Card } from '@/components/ui/card'
import VideoPlayer from '@/components/VideoPlayer'
import { getMovieVideos } from '@/lib/movies.server'
import type { Movie, Video } from '../types'

const TMDB_IMAGES_ASSET_URL = 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({ movie, showTitle = false }: { movie: Movie; showTitle?: boolean }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCardClick = async () => {
    setIsLoading(true)
    try {
      const videoResponse = await getMovieVideos({ data: { id: movie.id } })
      
      // Find the first trailer, or fall back to the first video
      const trailer = videoResponse.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      ) || videoResponse.results[0]

      if (trailer) {
        setSelectedVideo(trailer)
      } else {
        alert('No trailer available for this title')
      }
    } catch (error) {
      console.error('Error fetching video:', error)
      alert('Failed to load trailer')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-28 md:w-45">
        <Card
          className="rounded-2xl not-last-of-type:transition-all duration-300 hover:scale-105 hover:shadow-lg outline-blue-200 p-0 border-0 w-full h-[9.8rem] md:h-63 cursor-pointer relative"
          onClick={handleCardClick}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl z-10">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={
              movie?.poster_path
                ? TMDB_IMAGES_ASSET_URL + movie?.poster_path
                : '/placeholder.svg'
            }
            alt={movie?.title || movie?.name || 'Movie Poster'}
            className="w-full h-full object-cover rounded-xl"
          />
        </Card>
        {showTitle && (
          <p className="text-sm font-medium text-white line-clamp-1 text-center">
            {movie.title || movie.name}
          </p>
        )}
      </div>

      <VideoPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  )
}

export default MovieCard
