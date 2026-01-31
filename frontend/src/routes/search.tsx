import Grid_MovieList from '@/components/Grid_MovieList'
import Pagination from '@/components/Pagination'
import { SearchQuerySchema, searchMovies } from '@/lib/movies.server'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/search')({
  validateSearch: (search) => SearchQuerySchema.parse(search),
  loaderDeps: ({ search }) => ({ movie: search.movie || '', page: search.page }),
  loader: async ({ deps }) => {
    if (!deps.movie) return { movies: [], page: 1, totalPages: 0 }
    const data = await searchMovies({ data: { movie: deps.movie, page: deps.page } })
    return { 
      movies: data.results,
      page: data.page,
      totalPages: data.total_pages
    }
  },
  component: SearchComponent,
})

function SearchComponent() {
  const { movies, page, totalPages } = Route.useLoaderData()
  const { movie } = Route.useSearch()

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 max-w-6xl pt-8">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Search Results for "{movie}"
        </h2>
        {movies.length > 0 ? (
          <div>
            <Grid_MovieList movies={movies} />
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              path="/search" 
            />
          </div>
        ) : (
          <div className="text-white">No results found.</div>
        )}
      </div>
    </div>
  )
}
