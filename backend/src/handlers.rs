use crate::models::{PageQuery, SearchQuery, TmdbResponse, VideoResponse};
use crate::state::AppState;
use axum::{
    extract::{Path, Query, State},
    Json,
};

#[utoipa::path(
    get,
    path = "/",
    tag = "streamger",
    responses(
        (status = 200, description = "Backend is online", body = String)
    )
)]
pub async fn root() -> &'static str {
    "Streamger Backend is Online"
}

#[utoipa::path(
    get,
    path = "/api/trending",
    tag = "streamger",
    params(
        PageQuery
    ),
    responses(
        (status = 200, description = "List of trending content successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn get_trending_now(
    State(state): State<AppState>,
    Query(params): Query<PageQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/trending/all/week?api_key={}&page={}",
        state.tmdb_api_key, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/search",
    tag = "streamger",
    params(
        SearchQuery
    ),
    responses(
        (status = 200, description = "Search results successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn search_content(
    State(state): State<AppState>,
    Query(params): Query<SearchQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/search/multi?api_key={}&query={}&page={}&include_adult=false",
        state.tmdb_api_key, params.query, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/movie/{id}/videos",
    tag = "streamger",
    params(
        ("id" = i32, Path, description = "Movie ID from TMDB")
    ),
    responses(
        (status = 200, description = "Movie videos successfully retrieved", body = VideoResponse)
    )
)]
pub async fn get_movie_videos(
    State(state): State<AppState>,
    Path(id): Path<i32>,
) -> Json<VideoResponse> {
    let url = format!(
        "https://api.themoviedb.org/3/movie/{}/videos?api_key={}",
        id, state.tmdb_api_key
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<VideoResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/now_playing",
    tag = "streamger",
    params(
        PageQuery
    ),
    responses(
        (status = 200, description = "Now playing movies successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn now_playing(
    State(state): State<AppState>,
    Query(params): Query<PageQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/movie/now_playing?api_key={}&page={}",
        state.tmdb_api_key, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/upcoming",
    tag = "streamger",
    params(
        PageQuery
    ),
    responses(
        (status = 200, description = "Upcoming movies successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn upcoming(
    State(state): State<AppState>,
    Query(params): Query<PageQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&region=US&api_key={}&page={}",
        state.tmdb_api_key, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/popular_tv_shows",
    tag = "streamger",
    params(
        PageQuery
    ),
    responses(
        (status = 200, description = "Popular TV shows successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn popular_tv_shows(
    State(state): State<AppState>,
    Query(params): Query<PageQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/tv/popular?api_key={}&page={}",
        state.tmdb_api_key, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}

#[utoipa::path(
    get,
    path = "/api/top_rated_movies",
    tag = "streamger",
    params(
        PageQuery
    ),
    responses(
        (status = 200, description = "Top rated movies successfully retrieved", body = TmdbResponse)
    )
)]
pub async fn top_rated_movies(
    State(state): State<AppState>,
    Query(params): Query<PageQuery>,
) -> Json<TmdbResponse> {
    let page = params.page.unwrap_or(1);
    let url = format!(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=AT&api_key={}&page={}",
        state.tmdb_api_key, page
    );
    let res = state
        .client
        .get(&url)
        .send()
        .await
        .unwrap()
        .json::<TmdbResponse>()
        .await
        .unwrap();
    Json(res)
}
