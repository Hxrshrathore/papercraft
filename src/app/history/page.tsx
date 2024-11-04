'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Layers, Search, Download, Github, Twitter, Linkedin } from 'lucide-react'

// Mock data for download history
const mockDownloads = [
  { id: 1, fileName: 'Math_Grade10_Algebra.pdf', date: '2023-10-15', size: '2.3 MB' },
  { id: 2, fileName: 'Science_Grade11_Physics.pdf', date: '2023-10-14', size: '3.1 MB' },
  { id: 3, fileName: 'English_Grade9_Literature.pdf', date: '2023-10-13', size: '1.8 MB' },
  { id: 4, fileName: 'History_Grade12_WorldWar2.pdf', date: '2023-10-12', size: '4.2 MB' },
  { id: 5, fileName: 'Biology_Grade11_Genetics.pdf', date: '2023-10-11', size: '2.7 MB' },
]

export default function DownloadHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentYear, setCurrentYear] = useState('')

  // Set the current year on the client side to prevent hydration issues
  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  const filteredDownloads = mockDownloads.filter(download =>
    download.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    download.date.includes(searchTerm)
  )

  const handleReDownload = (fileName: string) => {
    // Dummy download simulation
    alert(`Downloading ${fileName}`)
  }

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
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12">Download History</h1>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by file name or date"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDownloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell>{download.fileName}</TableCell>
                      <TableCell>{download.date}</TableCell>
                      <TableCell>{download.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleReDownload(download.fileName)}>
                          <Download className="h-4 w-4 mr-2" />
                          Re-download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredDownloads.length === 0 && (
              <p className="text-center text-muted-foreground mt-4">No downloads found matching your search.</p>
            )}
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
              © {currentYear} BK science coaching Centre. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
