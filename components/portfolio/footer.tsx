interface FooterProps {
  name: string
  githubUrl?: string
  linkedinUrl?: string
  email?: string
}

export function Footer({ name, githubUrl, linkedinUrl, email }: FooterProps) {
  return (
    <footer className="container mx-auto px-6 py-12 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Javier Aznar. Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  )
}
