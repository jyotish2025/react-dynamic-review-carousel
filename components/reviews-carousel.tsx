"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Review {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface ReviewsCarouselProps {
  placeId: string
}

// ReviewsCarousel displays user reviews for a place, currently using mock data.
// Future: connect to real reviews API when available.
export default function ReviewsCarousel({ placeId }: ReviewsCarouselProps) {
  // States for reviews, pagination, loading/error flags, and detecting mobile view
  const [reviewList, setReviewList] = useState<Review[]>([])
  const [activePage, setActivePage] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [mobileView, setMobileView] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Detect screen size changes for mobile responsiveness
  useEffect(() => {
    function handleResize() {
      setMobileView(window.innerWidth < 768)
    }
    // Initial check and event listener
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Simulate fetching reviews asynchronously with a delay
  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true)
        // Mock review data
        const demoReviews: Review[] = [
          {
            author_name: "Kal T.",
            rating: 5,
            text: "My goodness is this place the absolute best! Every single interaction I've had with all the staff, starting from front desk, has been so warm and friendly.",
            relative_time_description: "2 weeks ago",
            time: Date.now(),
            language: "en",
          },
          {
            author_name: "Louise B.",
            rating: 5,
            text: "Amazing experience with KDC! All of the staff were amazing! Faith was very patient with me and kind throughout my dental treatment process. Great experience!",
            relative_time_description: "1 month ago",
            time: Date.now(),
            language: "en",
          },
          {
            author_name: "Victoria S.",
            rating: 5,
            text: "Amazing experience! It had been a while since my last dental visit and I've been made to feel so comfortable and taken care of. Highly recommend!",
            relative_time_description: "3 weeks ago",
            time: Date.now(),
            language: "en",
          },
          {
            author_name: "Andrea N.",
            rating: 5,
            text: "Great experience with the team at Kelowna Dental. It's been many years since my last dentist visit but with coming to them, they made me comfortable right away.",
            relative_time_description: "1 week ago",
            time: Date.now(),
            language: "en",
          },
          {
            author_name: "Michael R.",
            rating: 5,
            text: "Outstanding service and professional care. The entire team made me feel welcome and the treatment was painless. Highly recommend this dental practice!",
            relative_time_description: "4 days ago",
            time: Date.now(),
            language: "en",
          },
          {
            author_name: "Sarah L.",
            rating: 5,
            text: "Exceptional dental care! The staff is incredibly friendly and professional. They took great care of me and explained everything thoroughly.",
            relative_time_description: "1 week ago",
            time: Date.now(),
            language: "en",
          },
        ]
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setReviewList(demoReviews)
        setErrorMsg(null)
      } catch (err) {
        setErrorMsg("Could not load reviews.")
        console.error("Review fetch failed:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchReviews();
  }, [placeId])

  // How many reviews to show depending on screen size
  // Also calculate last page index for pagination bounds
  const reviewsPerPage = mobileView ? 2 : 4
  const lastPageIndex = Math.max(0, reviewList.length - reviewsPerPage)

  // Handlers for pagination buttons
  function goToNext() {
    setActivePage((prev) => Math.min(prev + reviewsPerPage, lastPageIndex))
  }
  function goToPrev() {
    setActivePage((prev) => Math.max(prev - reviewsPerPage, 0))
  }

  // Visual stars for rating, filled or outlined
  function showStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => (
        <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
    ))
  }

  // Extract initials for avatars
  function initialsFromName(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
  }

  // Assign avatar background based on first char of name for visual variety
  function pickAvatarColor(name: string) {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-indigo-500"]
    const idx = name.charCodeAt(0) % colors.length
    return colors[idx]
  }

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    )
  }

  // Display error and retry button if fetching failed
  if (errorMsg) {
    return (
        <div className="text-center py-16">
          <p className="text-red-500 mb-4">{errorMsg}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
    )
  }

  // Handle case with no reviews available
  if (reviewList.length === 0) {
    return (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No reviews available for this place</p>
        </div>
    )
  }

  // Reviews to display on the current page
  const currentReviews = reviewList.slice(activePage, activePage + reviewsPerPage)

  return (
      <div className="relative">
        {/* Carousel Reviews grid: adapts layout for mobile and desktop */}
        <div
            ref={carouselRef}
            className={`grid gap-6 mb-8 ${
                mobileView ? "grid-cols-1 grid-rows-2" : "grid-cols-2 lg:grid-cols-4 grid-rows-1"
            }`}
        >
          {currentReviews.map((review, idx) => (
              <Card key={`${review.author_name}-${activePage + idx}`} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Author and rating */}
                  <div className="flex items-center mb-4">
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${pickAvatarColor(
                            review.author_name
                        )}`}
                    >
                      {initialsFromName(review.author_name)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-foreground">{review.author_name}</h3>
                      <div className="flex items-center">
                        {showStars(review.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">{review.rating}.0</span>
                      </div>
                    </div>
                  </div>
                  {/* Review text */}
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
                  </div>
                  {/* Date of review */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">{review.relative_time_description}</p>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Navigation controls */}
        <div className="flex justify-center items-center space-x-4">
          <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              disabled={activePage === 0}
              className="rounded-full bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Pagination dots */}
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(reviewList.length / reviewsPerPage) }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setActivePage(i * reviewsPerPage)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                        Math.floor(activePage / reviewsPerPage) === i ? "bg-primary" : "bg-muted"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                />
            ))}
          </div>

          <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={activePage >= lastPageIndex}
              className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
  )
}
