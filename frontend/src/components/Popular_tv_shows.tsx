import { Link } from '@tanstack/react-router'
import type { MovieListProps } from '@/types'
import MovieList from './MovieList'

const Popular_tv_shows = ({ movies }: MovieListProps) => {
  return (
    <section className="my-8">
      <Link to="/popular-tv-shows" className="cursor-pointer">
        <h2 className="text-2xl font-bold mb-4">Popular TV Shows</h2>
      </Link>
      {movies && movies.length > 0 ? (
        <div>
          <MovieList movies={movies} />
        </div>
      ) : (
        <p>No Tv series available.</p>
      )}
    </section>
  )
}

export default Popular_tv_shows
