import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Smartphone, Cpu, Shield } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ITDepartmentPage() {
  const skills = [
    "Web Development",
    "Mobile Apps",
    "Database Design",
    "Cybersecurity",
    "AI/ML",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
  ]

  const projects = [
    {
      title: "Club Management System",
      description: "Full-stack web application for managing club activities and members",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Mobile Event App",
      description: "Cross-platform mobile app for event notifications and networking",
      tech: ["React Native", "Firebase"],
    },
    {
      title: "AI Study Assistant",
      description: "Machine learning tool to help students with academic planning",
      tech: ["Python", "TensorFlow", "Flask"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Code className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            IT <span className="text-primary">Department</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Drive innovation through technology. Build the digital future with cutting-edge development and emerging
            technologies.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join IT Department
            </Button>
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Web Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build responsive websites and web applications using modern frameworks and technologies.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <Smartphone className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mobile Development</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create cross-platform mobile applications for iOS and Android platforms.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Database & Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Design and implement robust backend systems and database architectures.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <Cpu className="h-8 w-8 text-primary mb-2" />
                <CardTitle>AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Explore artificial intelligence and machine learning to solve real-world problems.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Cybersecurity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn about digital security, ethical hacking, and protecting digital assets.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills & Technologies */}
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

      {/* Recent Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Recent Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Code the Future?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our IT department and turn your passion for technology into impactful projects
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
