import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt="Background Logo"
          width={800}
          height={800}
          className="opacity-[0.1] scale-150 select-none"
        />
      </div>

      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-8">
            <Image src="/logo.png" alt="Octobit Logo" width={120} height={120} className="rounded-2xl shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            About <span className="text-primary">Octobit</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            We are a dynamic scientific club dedicated to fostering innovation, collaboration, and technological
            advancement among students. Join our community of passionate learners and creators.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-border bg-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Pushing boundaries with cutting-edge projects and creative solutions that shape the future
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-border bg-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle className="text-foreground">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Building a supportive network of passionate students and professionals across all disciplines
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-border bg-card">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Developing skills through hands-on experience, mentorship, and real-world projects
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 text-pretty">
            Start your journey with Octobit and be part of something extraordinary
          </p>
          <Link href="/">
            <Button
              size="lg"
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
