"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Users, Mail, GraduationCap, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SharedHeader from "@/components/shared-header"

export default function JoinPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    academicYear: "",
    fieldOfStudy: "",
    preferredDepartment: "",
    secondaryDepartment: "",
    skills: "",
    motivation: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const academicYears = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "5th Year" },
    { value: "master", label: "Master's" },
    { value: "phd", label: "PhD" },
    { value: "faculty", label: "Faculty/Staff" },
  ]

  const departments = [
    { value: "it", label: "IT Department" },
    { value: "events", label: "Événementiel (Events)" },
    { value: "social-media", label: "Social Media" },
    { value: "design", label: "Design" },
    { value: "extern", label: "Extern (External Relations)" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <SharedHeader />
        <div className="flex items-center justify-center px-4 py-12">
          <Card className="w-full max-w-md text-center border-border bg-card">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Welcome to Octobit!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your membership application has been received
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Thank you for joining our scientific community! We will review your application and contact you within
                48 hours with next steps and department assignment details.
              </p>
              <div className="bg-muted/50 p-3 rounded-lg text-sm">
                <p className="font-medium text-foreground">What's Next:</p>
                <p className="text-muted-foreground">📧 Check your email for confirmation</p>
                <p className="text-muted-foreground">👥 Join our orientation session</p>
                <p className="text-muted-foreground">🚀 Start your Octobit journey!</p>
              </div>
              <Link href="/">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

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

      {/* Registration Form */}
      <main className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary mr-3" />
              <Heart className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Octobit Club</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Become part of our scientific community and explore technology, innovation, and collaboration.
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Club Membership</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out this form to join our scientific club and choose your preferred department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="border-border bg-input text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="border-border bg-input text-foreground"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    Academic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="academicYear" className="text-foreground">
                        Academic Level *
                      </Label>
                      <Select
                        value={formData.academicYear}
                        onValueChange={(value) => handleInputChange("academicYear", value)}
                      >
                        <SelectTrigger className="border-border bg-input text-foreground">
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                        <SelectContent>
                          {academicYears.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fieldOfStudy" className="text-foreground">
                        Field of Study *
                      </Label>
                      <Input
                        id="fieldOfStudy"
                        required
                        placeholder="e.g., Computer Science, Engineering"
                        value={formData.fieldOfStudy}
                        onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                        className="border-border bg-input text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Department Preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Department Preferences</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDepartment" className="text-foreground">
                        Preferred Department *
                      </Label>
                      <Select
                        value={formData.preferredDepartment}
                        onValueChange={(value) => handleInputChange("preferredDepartment", value)}
                      >
                        <SelectTrigger className="border-border bg-input text-foreground">
                          <SelectValue placeholder="Choose your main interest" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryDepartment" className="text-foreground">
                        Secondary Interest (Optional)
                      </Label>
                      <Select
                        value={formData.secondaryDepartment}
                        onValueChange={(value) => handleInputChange("secondaryDepartment", value)}
                      >
                        <SelectTrigger className="border-border bg-input text-foreground">
                          <SelectValue placeholder="Secondary department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Tell Us More</h3>
                  <div className="space-y-2">
                    <Label htmlFor="skills" className="text-foreground">
                      Skills & Experience (Optional)
                    </Label>
                    <Textarea
                      id="skills"
                      placeholder="Programming languages, design tools, event planning experience, etc."
                      value={formData.skills}
                      onChange={(e) => handleInputChange("skills", e.target.value)}
                      className="border-border bg-input text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motivation" className="text-foreground">
                      Why do you want to join Octobit? *
                    </Label>
                    <Textarea
                      id="motivation"
                      required
                      placeholder="Share your motivation and what you hope to achieve..."
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      className="border-border bg-input text-foreground min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-foreground">
                    I agree to the club terms and conditions and commit to active participation *
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!formData.agreeToTerms || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Join Octobit Club
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
