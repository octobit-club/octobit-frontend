import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Layers, ImageIcon, Brush, Sparkles } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function DesignDepartmentPage() {
  const skills = [
    "UI/UX Design",
    "Graphic Design",
    "Branding",
    "Typography",
    "Color Theory",
    "Prototyping",
    "User Research",
    "Visual Communication",
  ]

  const tools = [
    "Figma",
    "Adobe Creative Suite",
    "Sketch",
    "Canva",
    "Procreate",
    "Blender",
    "After Effects",
    "InVision",
  ]

  const designAreas = [
    {
      title: "Brand Identity",
      description: "Create cohesive visual identities for club projects and events",
      icon: <Sparkles className="h-8 w-8 text-primary" />,
    },
    {
      title: "Digital Design",
      description: "Design websites, apps, and digital interfaces",
      icon: <Layers className="h-8 w-8 text-primary" />,
    },
    {
      title: "Print Design",
      description: "Create posters, flyers, and promotional materials",
      icon: <ImageIcon className="h-8 w-8 text-primary" />,
    },
    {
      title: "Illustration",
      description: "Custom illustrations and visual storytelling",
      icon: <Brush className="h-8 w-8 text-primary" />,
    },
  ]

  const responsibilities = [
    "Design visual materials for club events and campaigns",
    "Create and maintain brand guidelines and visual identity",
    "Collaborate with other departments on design needs",
    "Develop user interfaces for digital projects",
    "Produce marketing materials and promotional content",
    "Conduct user research and usability testing",
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Palette className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Design <span className="text-primary">Department</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Bring ideas to life through visual design. Create stunning graphics, interfaces, and brand experiences that
            captivate and inspire.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Design Team
            </Button>
          </Link>
        </div>
      </section>

      {/* Design Areas */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Design Specializations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {designAreas.map((area, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {area.icon}
                    <CardTitle>{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Software */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Tools You'll Master</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool) => (
              <Badge key={tool} variant="outline" className="px-4 py-2 text-sm">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Your Responsibilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-muted-foreground">{responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Development */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Skills You'll Develop</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Design the Future?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our design team and transform ideas into beautiful, functional visual experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Register Now
              </Button>
            </Link>
            <Link href="/departments">
              <Button variant="outline" size="lg">
                Explore Other Departments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
