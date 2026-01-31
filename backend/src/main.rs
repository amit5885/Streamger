use axum::{routing::get, Router};
use dotenv::dotenv;
use std::env;
use tokio::net::TcpListener;
use tower_http::{cors::CorsLayer, services::ServeDir};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

//modules
mod handlers;
mod models;
mod state;

use handlers::{
    get_movie_videos, get_trending_now, now_playing, popular_tv_shows, root, search_content,
    top_rated_movies, upcoming,
};
use state::AppState;

#[derive(OpenApi)]
#[openapi(
    paths(
        handlers::root,
        handlers::get_trending_now,
        handlers::search_content,
        handlers::get_movie_videos,
        handlers::now_playing,
        handlers::upcoming,
        handlers::popular_tv_shows,
        handlers::top_rated_movies
    ),
    components(
        schemas(
            models::Movie,
            models::TmdbResponse,
            models::Video,
            models::VideoResponse,
            models::PageQuery,
            models::SearchQuery
        )
    ),
    tags(
        (name = "streamger", description = "Streamger API for TMDB content")
    )
)]
struct ApiDoc;

#[tokio::main]
async fn main() {
    dotenv().ok(); // means that it will load the .env file if it exists in the current directory

    let api_key = env::var("TMDB_API_KEY").expect("TMDB_API_KEY must be set");
    let state = AppState {
        tmdb_api_key: api_key,
        client: reqwest::Client::new(),
    };

    let swagger = Router::new()
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .with_state(state.clone());

    let app = Router::new()
        .route("/", get(root))
        .route("/api/trending", get(get_trending_now))
        .route("/api/search", get(search_content))
        .route("/api/movie/{id}/videos", get(get_movie_videos))
        .route("/api/now_playing", get(now_playing))
        .route("/api/upcoming", get(upcoming))
        .route("/api/popular_tv_shows", get(popular_tv_shows))
        .route("/api/top_rated_movies", get(top_rated_movies))
        .merge(swagger)
        .nest_service("/stream", ServeDir::new("assets"))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    println!(
        "Server started at http://{}",
        listener.local_addr().unwrap()
    );
    println!(
        "Swagger UI available at http://{}/swagger-ui",
        listener.local_addr().unwrap()
    );

    axum::serve(listener, app).await.unwrap();
}
