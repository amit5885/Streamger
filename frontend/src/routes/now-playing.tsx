import { createFileRoute } from '@tanstack/react-router'
import { getNowPlaying } from '@/lib/movies.server'
import { z } from 'zod'
import Pagination from '@/components/Pagination'
import MovieCard from '@/components/MovieCard'

const SearchSchema = z.object({
  page: z.number().optional().default(1),
})

export const Route = createFileRoute('/now-playing')({
  validateSearch: SearchSchema,
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ deps }) => {
    const data = await getNowPlaying({ data: { page: deps.page } })
    return { 
      movies: data.results,
      page: data.page,
      totalPages: data.total_pages
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { movies, page, totalPages } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto mt-6 max-w-6xl px-6">
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-6">Now Playing</h1>
          {movies && movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} showTitle={true} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} path="/now-playing" />
            </>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
