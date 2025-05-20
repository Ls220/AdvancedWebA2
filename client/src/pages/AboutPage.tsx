import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About ShopVerse</h1>

        <div className="mb-12 relative rounded-lg overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=1000&text=Our+Story"
            alt="Our clothing store team"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold">Our Story</h2>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg">
            Welcome to Listers shop, your premier destination for high-quality clothing for men, women, and children.
            
          </p>

          <p className="text-lg mt-4">
            What sets us apart is our commitment to quality, sustainability and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  We carefully select each item in our collections to help ensure the highest quality standards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ethical Sourcing</h3>
                <p className="text-muted-foreground">
                  All clothing is ethically sourced and made with care.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-muted-foreground">
                  We believe quality fashion should be accessible, offering competitive prices without compromising
                  quality.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=200&width=200&text=Sarah",
              },
              {
                name: "Michael Chen",
                role: "Creative Director",
                image: "/placeholder.svg?height=200&width=200&text=Michael",
              },
              {
                name: "Aisha Patel",
                role: "Head of Operations",
                image: "/placeholder.svg?height=200&width=200&text=Aisha",
              },
              {
                name: "David Kim",
                role: "Customer Experience",
                image: "/placeholder.svg?height=200&width=200&text=David",

                //remove not needed as design was changed (got rid of placeholder images and added maps)
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden mb-4 aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Listers Shop?</h2>
          <p className="text-lg mb-6">Discover our latest collections and find your perfect style today.</p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

