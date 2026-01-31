import type { Movie, MovieListProps } from '../types'

import MovieCard from './MovieCard'

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul
      className="flex relative overflow-x-scroll overflow-y-hidden space-x-2
               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {movies.map((movie: Movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}

export default MovieList
