import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Handshake, Building, Users, Globe, MessageCircle, Target } from "lucide-react"
import Link from "next/link"
import SharedHeader from "@/components/shared-header"

export default function ExternDepartmentPage() {
  const skills = [
    "Partnership Development",
    "Networking",
    "Communication",
    "Negotiation",
    "Relationship Management",
    "Business Development",
    "Public Speaking",
    "Strategic Planning",
  ]

  const partnerTypes = [
    {
      title: "Industry Partners",
      description: "Tech companies, startups, and established businesses",
      icon: <Building className="h-8 w-8 text-primary" />,
    },
    {
      title: "Academic Institutions",
      description: "Universities, research centers, and educational organizations",
      icon: <Globe className="h-8 w-8 text-primary" />,
    },
    {
      title: "Alumni Network",
      description: "Former club members now working in various industries",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Community Organizations",
      description: "Local NGOs, government agencies, and community groups",
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
    },
  ]

  const responsibilities = [
    "Identify and reach out to potential partners and sponsors",
    "Maintain relationships with existing partners and alumni",
    "Coordinate guest speaker sessions and industry visits",
    "Negotiate partnership agreements and sponsorship deals",
    "Represent the club at external events and conferences",
    "Develop strategies for community outreach and engagement",
  ]

  const opportunities = [
    "Internship placements with partner companies",
    "Mentorship programs with industry professionals",
    "Exclusive workshops and training sessions",
    "Networking events and career fairs",
    "Scholarship and funding opportunities",
    "Industry project collaborations",
  ]

  return (
    <div className="min-h-screen bg-background">
      <SharedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Handshake className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Extern <span className="text-primary">Department</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Build bridges to the outside world. Connect our club with industry partners, alumni, and the broader
            community to create valuable opportunities.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Join Extern Team
            </Button>
          </Link>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Partner Network</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((partner, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {partner.icon}
                    <CardTitle>{partner.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{partner.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Opportunities We Create</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Target className="flex-shrink-0 w-5 h-5 text-primary mt-1" />
                <p className="text-muted-foreground">{opportunity}</p>
              </div>
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Expand Our Network?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our extern team and help create valuable connections that benefit our entire community
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
