import ReviewsCarousel from "@/components/reviews-carousel"

// Homepage showing patient testimonials - feel free to update placeId as needed
export default function Home() {
  return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          {/* Header section with centered heading and heart icon */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                {/* Using emoji directly for love icon */}
                <span className="text-white text-lg">❤️</span>
              </div>
            </div>
            {/* Main heading with responsive sizing */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Stories from Our Happy Patients
            </h1>
          </div>

          {/* Carousel component to show reviews from Google place */}
          <ReviewsCarousel placeId="ChIJN1t_tDeuEmsRUsoyG83frY4" />
        </div>
      </main>
  )
}
