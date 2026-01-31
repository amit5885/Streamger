import { Link } from '@tanstack/react-router'
import type { MovieListProps } from '@/types'
import MovieList from './MovieList'

const TrendingNow = ({ movies }: MovieListProps) => {
  return (
    <section className="my-8">
      <Link to="/trending" className="cursor-pointer">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      </Link>
      {movies && movies.length > 0 ? (
        <div>
          <MovieList movies={movies} />
        </div>
      ) : (
        <p>No trending movies available.</p>
      )}
    </section>
  )
}

export default TrendingNow
