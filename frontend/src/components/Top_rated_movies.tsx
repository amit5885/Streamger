import { Link } from '@tanstack/react-router'
import type { MovieListProps } from '@/types'
import MovieList from './MovieList'

const TopRatedMovies = ({ movies }: MovieListProps) => {
  return (
    <section className="my-8">
      <Link to="/top-rated-movies" className="cursor-pointer">
        <h2 className="text-2xl font-bold mb-4">Top Rated Movies</h2>
      </Link>
      {movies && movies.length > 0 ? (
        <div>
          <MovieList movies={movies} />
        </div>
      ) : (
        <p>No movies available.</p>
      )}
    </section>
  )
}

export default TopRatedMovies

