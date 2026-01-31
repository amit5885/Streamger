import type { Movie, MovieListProps } from '../types'
import MovieCard from './MovieCard'

const Grid_MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="container mx-auto mt-6 max-w-6xl px-6">
        <div className="my-8">
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
            {movies.map((movie: Movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} showTitle={true} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Grid_MovieList
