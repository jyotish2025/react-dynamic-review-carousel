// Utility to fetch reviews from Google Places API
// Don’t forget to set NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in your environment variables

interface GooglePlacesReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GooglePlacesResponse {
  result: {
    reviews: GooglePlacesReview[]
  }
  status: string
}

// Fetch reviews directly from Google Places API given a place ID
// Throws if API key missing or any error occurs fetching the reviews
export async function fetchGoogleReviews(placeId: string): Promise<GooglePlacesReview[]> {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

  if (!API_KEY) {
    // Missing API key? That's a problem!
    throw new Error("Google Places API key not configured")
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      // Handle network or server errors (quota exceeded, bad request, etc.)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: GooglePlacesResponse = await response.json()

    if (data.status !== "OK") {
      // API-level errors could be ZERO_RESULTS, OVER_QUERY_LIMIT, etc.
      throw new Error(`Google Places API error: ${data.status}`)
    }

    // Return reviews if any, otherwise empty array
    return data.result.reviews || []
  } catch (error) {
    console.error("Error fetching Google reviews:", error)
    // Rethrow so caller deals with this
    throw error
  }
}

// Alternative: Fetch reviews via own backend API route.
// Keeps API key hidden and allows custom caching or aggregation
export async function fetchReviewsServerSide(placeId: string) {
  try {
    const response = await fetch(`/api/reviews?placeId=${placeId}`)

    if (!response.ok) {
      throw new Error("Failed to fetch reviews")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }
}
