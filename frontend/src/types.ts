type Movie = {
  id: number
  title: string
  name: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  media_type?: string
}

type MovieListProps = {
  movies: Movie[]
}

type Show = Movie

type Video = {
  id: string
  key: string
  site: string
  type: string
  name: string
}

type VideoResponse = {
  id: number
  results: Video[]
}

type PaginatedResponse<T> = {
  results: T[]
  page: number
  total_pages: number
}

export type { Movie, Show, MovieListProps, Video, VideoResponse, PaginatedResponse }

