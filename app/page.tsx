
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SharedHeader from "@/components/shared-header";

export default function RegisterPage() {
  const departments = [
    { value: "it", label: "IT - Technology & Programming" },
    { value: "events", label: "Événementiel - Event Planning" },
    { value: "social", label: "Social Media - Digital Marketing" },
    { value: "design", label: "Design - Visual & Creative" },
    { value: "extern", label: "Extern - Partnerships & Outreach" },
  ];

  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    academicYear: "",
    fieldOfStudy: "",
    preferredDepartment: "",
    motivation: "",
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Registration failed");
      setIsSubmitted(true);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              We have received your registration and will review your application. You will hear back from us soon.
            </p>
            <Link href="/">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt="Background Logo"
          width={800}
          height={800}
          className="opacity-[0.03] scale-150 select-none"
        />
      </div>

      <SharedHeader />

      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Image src="/logo.png" alt="Octobit Logo" width={80} height={80} className="rounded-xl shadow-lg opacity-100 border-0 flex-row items-stretch" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Join <span className="text-primary">Octobit</span> Scientific Club
            </h1>
            <p className="text-lg text-muted-foreground mb-6 text-pretty max-w-2xl mx-auto">
              Dive into innovation with us. Registration opens September 22nd, 2024.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Learn More About Us
                </Button>
              </Link>
              <Link href="/departments">
                <Button
                  variant="outline"
                  className="border-accent text-foreground hover:bg-accent hover:text-accent-foreground bg-background"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Explore Departments
                </Button>
              </Link>
            </div>
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground px-4 py-2">
              🎉 New Academic Year 2024-2025
            </Badge>
          </div>

          {/* Registration Form */}
          <Card className="border-border backdrop-blur-sm max-w-2xl mx-auto relative z-20 bg-transparent opacity-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Member Registration</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form below to join our scientific community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" className="bg-input border-border" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" className="bg-input border-border" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-foreground">Student ID (Matricule)</Label>
                  <Input id="studentId" value={formData.studentId} onChange={handleInputChange} placeholder="202331551801" className="bg-input border-border" required type="number" inputMode="numeric" pattern="[0-9]*" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="your.email@example.com" className="bg-input border-border" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="bg-input border-border" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear" className="text-foreground">Academic Year</Label>
                    <Select value={formData.academicYear} onValueChange={(value) => handleSelectChange("academicYear", value)}>
                      <SelectTrigger id="academicYear" className="bg-input border-border">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy" className="text-foreground">Field of Study</Label>
                    <Input id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} placeholder="e.g., Computer Science" className="bg-input border-border" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredDepartment" className="text-foreground">Preferred Department</Label>
                  <Select value={formData.preferredDepartment} onValueChange={(value) => handleSelectChange("preferredDepartment", value)}>
                    <SelectTrigger id="preferredDepartment" className="bg-input border-border">
                      <SelectValue placeholder="Choose your department" />
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
                  <Label htmlFor="motivation" className="text-foreground">Why do you want to join Octobit?</Label>
                  <Textarea id="motivation" value={formData.motivation} onChange={handleInputChange} placeholder="Tell us about your interests and what you hope to achieve..." className="bg-input border-border min-h-[100px]" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-foreground">Previous Experience (Optional)</Label>
                  <Textarea id="experience" value={formData.experience} onChange={handleInputChange} placeholder="Any relevant projects, skills, or experience..." className="bg-input border-border" />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : (<><Calendar className="mr-2 h-5 w-5" />Submit Registration</>)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border mt-12 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image src="/logo.png" alt="Octobit Logo" width={32} height={32} className="rounded-lg" />
            <div>
              <h3 className="font-bold text-foreground">Octobit Scientific Club</h3>
              <p className="text-sm text-muted-foreground">Diving into Innovation</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Registration opens September 22, 2024</p>
        </div>
      </footer>
    </div>
  );
}
