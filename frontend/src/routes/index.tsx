import { createFileRoute } from '@tanstack/react-router'
import Hero from '@/components/Hero'
import TrendingNow from '@/components/TrendingNow'
import NowPlaying from '@/components/Now_playing'
import PopularTvShows from '@/components/Popular_tv_shows'
import TopRatedMovies from '@/components/Top_rated_movies'
import Coming from '@/components/Coming'
import {
  getTrendingMovies,
  getNowPlaying,
  getPopularTvShows,
  getTopRatedMovies,
  getUpcomingMovies
} from '@/lib/movies.server'
export const Route = createFileRoute('/')({
  loader: async () => {
    try {
      const [trendingMovies, nowPlaying, popularTvShows, topRatedMovies, upcomingMovies] = await Promise.all([
        getTrendingMovies({ data: { page: 1 } }),
        getNowPlaying({ data: { page: 1 } }),
        getPopularTvShows({ data: { page: 1 } }),
        getTopRatedMovies({ data: { page: 1 } }),
        getUpcomingMovies({ data: { page: 1 } })
      ])

      return {
        trendingMovies: trendingMovies.results,
        nowPlaying: nowPlaying.results,
        popularTvShows: popularTvShows.results,
        topRatedMovies: topRatedMovies.results,
        upcomingMovies: upcomingMovies.results
      }
    } catch (error) {
      console.error('Loader error:', error)
      return {
        trendingMovies: [],
        nowPlaying: [],
        popularTvShows: [],
        topRatedMovies: [],
        upcomingMovies: []
      }
    }
  },
  component: App,
})

function App() {
  const trendingMovies = Route.useLoaderData().trendingMovies
  const nowPlaying = Route.useLoaderData().nowPlaying
  const popularTvShows = Route.useLoaderData().popularTvShows
  const topRatedMovies = Route.useLoaderData().topRatedMovies
  const upcomingMovies = Route.useLoaderData().upcomingMovies

  return (
    <main>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Hero />
        <div className="container mx-auto mt-6 max-w-7xl px-6">
          <TrendingNow movies={trendingMovies} />
          <NowPlaying movies={nowPlaying} />
          <PopularTvShows movies={popularTvShows} />
          <TopRatedMovies movies={topRatedMovies}/>
          <Coming movies={upcomingMovies}/>
        </div>
      </div>
    </main>
  )
}

