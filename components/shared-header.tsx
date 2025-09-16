import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SharedHeader() {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Octobit Logo" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Octobit</h1>
              <p className="text-sm text-muted-foreground">Scientific Club</p>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Register
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About Club
              </Link>
              <Link href="/departments" className="text-foreground hover:text-primary transition-colors">
                Departments
              </Link>
              <Link href="/events" className="text-foreground hover:text-primary transition-colors">
                Events
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
