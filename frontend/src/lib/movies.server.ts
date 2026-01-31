import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import type { Movie, Show, VideoResponse } from '@/types'

import { PaginatedResponse } from '@/types'

const API_BASE_URL = process.env.VITE_API_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as T
}

export const getTrendingMovies = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().optional() }))
  .handler(async (ctx): Promise<PaginatedResponse<Movie>> => {
    const page = ctx.data?.page || 1
    const data = await fetchJson<PaginatedResponse<Movie>>(`/api/trending?page=${page}`)
    return data
  })

export const SearchQuerySchema = z.object({
  movie: z.string().min(1, 'Movie query cannot be empty'),
  page: z.number().optional(),
})

export const searchMovies = createServerFn({ method: 'GET' })
  .inputValidator(SearchQuerySchema)
  .handler(async (ctx): Promise<PaginatedResponse<Movie>> => {
    const query = encodeURIComponent(ctx.data.movie)
    const page = ctx.data.page || 1
    const data = await fetchJson<PaginatedResponse<Movie>>(
      `/api/search?query=${query}&page=${page}`,
    )
    return data
  })

export const getNowPlaying = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().optional() }))
  .handler(async (ctx): Promise<PaginatedResponse<Movie>> => {
    const page = ctx.data?.page || 1
    const data = await fetchJson<PaginatedResponse<Movie>>(`/api/now_playing?page=${page}`)
    return data
  })

export const getPopularTvShows = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().optional() }))
  .handler(async (ctx): Promise<PaginatedResponse<Show>> => {
    const page = ctx.data?.page || 1
    const data = await fetchJson<PaginatedResponse<Show>>(`/api/popular_tv_shows?page=${page}`)
    return data
  })

export const getTopRatedMovies = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().optional() }))
  .handler(async (ctx): Promise<PaginatedResponse<Movie>> => {
    const page = ctx.data?.page || 1
    const data = await fetchJson<PaginatedResponse<Movie>>(`/api/top_rated_movies?page=${page}`)
    return data
  })

export const getUpcomingMovies = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ page: z.number().optional() }))
  .handler(async (ctx): Promise<PaginatedResponse<Movie>> => {
    const page = ctx.data?.page || 1
    const data = await fetchJson<PaginatedResponse<Movie>>(`/api/upcoming?page=${page}`)
    return data
  })

export const getMovieVideos = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.number() }))
  .handler(async (ctx): Promise<VideoResponse> => {
    const data = await fetchJson<VideoResponse>(`/api/movie/${ctx.data.id}/videos`)
    return data
  })
