import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Layers, Github, Twitter, Linkedin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BK science coaching Centre</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
            <Link href="/download" className="text-sm font-medium hover:text-primary">Download</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
          </nav>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </div>
      </header>
      

      <main className="flex-grow">
        <section className="py-12 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">About BK science coaching Centre</h1>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg mb-6">
                BK science coaching Centre is an innovative PDF software designed to revolutionize the way educators create custom question papers. Our mission is to simplify the process of generating tailored assessments, saving valuable time for teachers and ensuring students receive well-structured, relevant test materials.
              </p>
              <p className="text-lg mb-6">
                With BK science coaching Centre, you can easily filter questions by class, subject, and chapter, select the most appropriate questions for your needs, and generate a professionally formatted PDF with just a few clicks. Our intuitive interface and powerful features make it the go-to tool for educators across all disciplines.
              </p>
              <h2 className="text-2xl font-semibold mt-12 mb-6">Key Features</h2>
              <ul className="text-left list-disc list-inside mb-6">
                <li>Customizable filters for precise question selection</li>
                <li>Intuitive cascading dropdowns for easy navigation</li>
                <li>Instant PDF generation and download</li>
                <li>Extensive question bank covering multiple subjects and grade levels</li>
                <li>User-friendly interface designed for efficiency</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=400&width=400" },
                { name: "John Smith", role: "Lead Developer", image: "/placeholder.svg?height=400&width=400" },
                { name: "Emily Brown", role: "UX Designer", image: "/placeholder.svg?height=400&width=400" },
              ].map((member) => (
                <Card key={member.name}>
                  <CardContent className="p-6 text-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-muted-foreground mb-4">{member.role}</p>
                    <div className="flex justify-center space-x-4">
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">GitHub</span>
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-muted-foreground hover:text-primary">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="/help" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} BK science coaching Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}