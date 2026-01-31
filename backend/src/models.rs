use serde::{Deserialize, Serialize};
use utoipa::{IntoParams, ToSchema};

/// Movie or TV show item
#[derive(Clone, Debug, Deserialize, Serialize, ToSchema)]
pub struct Movie {
    /// Unique identifier from TMDB
    pub id: i32,
    /// Movie title (for movies)
    #[schema(example = "The Shawshank Redemption")]
    pub title: Option<String>,
    /// Show name (for TV shows)
    #[schema(example = "Breaking Bad")]
    pub name: Option<String>,
    /// Plot overview
    #[schema(example = "Two imprisoned men bond over a number of years...")]
    pub overview: Option<String>,
    /// Poster image path
    #[schema(example = "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg")]
    pub poster_path: Option<String>,
    /// Backdrop image path
    #[schema(example = "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg")]
    pub backdrop_path: Option<String>,
    /// Average vote rating
    #[schema(example = 8.7)]
    pub vote_average: Option<f64>,
    /// Release date
    #[schema(example = "1994-09-23")]
    pub release_date: Option<String>,
    /// Media type (movie or tv)
    #[schema(example = "movie")]
    pub media_type: Option<String>,
}

/// TMDB API response containing paginated results
#[derive(Clone, Debug, Deserialize, Serialize, ToSchema)]
pub struct TmdbResponse {
    /// Current page number
    pub page: i32,
    /// Array of movie/TV show results
    pub results: Vec<Movie>,
    /// Total number of pages available
    pub total_pages: i32,
}

/// Video information (trailer, teaser, etc.)
#[derive(Clone, Debug, Deserialize, Serialize, ToSchema)]
pub struct Video {
    /// Unique video identifier
    pub id: String,
    /// Video key (YouTube key for YouTube videos)
    #[schema(example = "dQw4w9WgXcQ")]
    pub key: String,
    /// Video hosting site
    #[schema(example = "YouTube")]
    pub site: String,
    /// Video type
    #[schema(example = "Trailer")]
    pub r#type: String,
    /// Video name/title
    #[schema(example = "Official Trailer")]
    pub name: String,
}

/// Response containing video information for a movie
#[derive(Clone, Debug, Deserialize, Serialize, ToSchema)]
pub struct VideoResponse {
    /// Movie ID
    pub id: i32,
    /// Array of video results
    pub results: Vec<Video>,
}

/// Pagination query parameters
#[derive(Deserialize, IntoParams, ToSchema)]
pub struct PageQuery {
    /// Page number for pagination (defaults to 1)
    #[param(example = 1)]
    pub page: Option<i32>,
}

/// Search query parameters
#[derive(Deserialize, IntoParams, ToSchema)]
pub struct SearchQuery {
    /// Search query string
    #[param(example = "inception")]
    pub query: String,
    /// Page number for pagination (defaults to 1)
    #[param(example = 1)]
    pub page: Option<i32>,
}
