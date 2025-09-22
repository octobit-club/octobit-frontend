import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function DepartmentsPage() {
  const departments = [
    {
      slug: "it",
      name: "IT",
      description: "Technology development, programming, and digital innovation",
      icon: "💻",
    },
    {
      slug: "events",
      name: "Événementiel",
      description: "Event planning, organization, and management",
      icon: "🎯",
    },
    {
      slug: "social-media",
      name: "Social Media",
      description: "Digital marketing, content creation, and online presence",
      icon: "📱",
    },
    {
      slug: "design",
      name: "Design",
      description: "Visual design, branding, and creative solutions",
      icon: "🎨",
    },
    {
      slug: "extern",
      name: "Extern",
      description: "External partnerships and community outreach",
      icon: "🤝",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Our <span className="text-primary">Departments</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Explore our diverse departments and find where your passion fits best
          </p>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Card key={dept.slug} className="hover:shadow-lg transition-all border-border bg-card group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{dept.icon}</span>
                      <CardTitle className="text-foreground">{dept.name}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground mb-4">{dept.description}</CardDescription>
                  <Link href={`/departments/${dept.slug}`}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Choose Your Path?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the department that matches your interests and start making an impact
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
