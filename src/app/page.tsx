import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FileDown, Filter, Layers, Github, Twitter, Linkedin } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Layers className="h-6 w-6 text-primary" />
            <> 
              <span className="text-xl font-bold">BK science coaching Centre</span>
            </>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">About</Link>
            <Link href="/download" className="text-sm font-medium hover:text-primary">Download</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
            <Link href="/History" className="text-sm font-medium hover:text-primary">History</Link>
            
          </nav>
          <Button variant="outline" className="md:hidden">Menu</Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Custom Question Papers with Ease</h1>
            <p className="text-xl mb-8">Generate tailored PDF question papers for any subject in just a few clicks</p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Creating Papers
            </Button>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                  <Filter className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customizable Filters</h3>
                <p className="text-muted-foreground">Easily filter questions by class, subject, and chapter</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                  <FileDown className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Download as PDF</h3>
                <p className="text-muted-foreground">Get your custom question paper in a ready-to-use PDF format</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-block mb-4">
                  <Layers className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cascading Dropdowns</h3>
                <p className="text-muted-foreground">Intuitive selection process with interdependent options</p>
              </div>
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
              © {new Date().getFullYear()} Harsh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}