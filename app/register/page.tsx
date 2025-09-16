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
import { ArrowLeft, Users, Mail, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    academicYear: "",
    fieldOfStudy: "",
    preferredDepartment: "",
    secondChoiceDepartment: "",
    motivation: "",
    experience: "",
    agreeToTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const departments = [
    { value: "it", label: "IT" },
    { value: "evenementiel", label: "Événementiel" },
    { value: "social-media", label: "Social Media" },
    { value: "design", label: "Design" },
    { value: "extern", label: "Extern" },
  ]

  const academicYears = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "5th Year" },
    { value: "master", label: "Master's" },
    { value: "phd", label: "PhD" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    console.log('Member registration data:', formData);
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center border-border bg-card">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Registration Submitted!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Thank you for your interest in joining Octobit Scientific Club
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We have received your registration and will review your application. You will hear back from us within 5-7
              business days.
            </p>
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
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

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="Octobit Logo" width={40} height={40} className="rounded-lg" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Octobit</h1>
                <p className="text-sm text-muted-foreground">Scientific Club</p>
              </div>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-border text-foreground hover:bg-muted bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <main className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Octobit</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Ready to dive into innovation? Fill out the form below to become a member of our scientific club.
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Membership Registration</CardTitle>
              <CardDescription className="text-muted-foreground">
                Please provide your information to join Octobit Scientific Club
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
                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-foreground">
                      Student ID *
                    </Label>
                    <Input
                      id="studentId"
                      type="number"
                      required
                      value={formData.studentId}
                      onChange={(e) => handleInputChange("studentId", e.target.value)}
                      className="border-border bg-input text-foreground"
                      placeholder="e.g., 202331551801"
                    />
                  </div>
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
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
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
                        Academic Year *
                      </Label>
                      <Select
                        value={formData.academicYear}
                        onValueChange={(value) => handleInputChange("academicYear", value)}
                      >
                        <SelectTrigger className="border-border bg-input text-foreground">
                          <SelectValue placeholder="Select your year" />
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
                          <SelectValue placeholder="Select department" />
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
                      <Label htmlFor="secondChoiceDepartment" className="text-foreground">
                        Second Choice (Optional)
                      </Label>
                      <Select
                        value={formData.secondChoiceDepartment}
                        onValueChange={(value) => handleInputChange("secondChoiceDepartment", value)}
                      >
                        <SelectTrigger className="border-border bg-input text-foreground">
                          <SelectValue placeholder="Select department" />
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
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-foreground">
                      Relevant Experience (Optional)
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Any relevant projects, skills, or experience you'd like to share..."
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      className="border-border bg-input text-foreground min-h-[80px]"
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
                    I agree to the terms and conditions and commit to active participation in club activities *
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Submit Registration
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
