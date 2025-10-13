"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useToast } from "@/hooks/use-toast"

interface HeroSectionProps {
  name: string
  title: string
  description: string
  githubUrl?: string
  linkedinUrl?: string
  email?: string
}

export function HeroSection({ name, title, description, githubUrl, linkedinUrl, email }: HeroSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: descRef, isVisible: descVisible } = useScrollAnimation()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation()
  const { toast } = useToast()

  const mailtoLink = email
    ? `mailto:${email}?subject=Let's work together&body=Hi ${name},%0D%0A%0D%0AI'd like to discuss a potential opportunity with you.`
    : ""

  const handleEmailClick = () => {
    toast({
      title: "Opening email client",
      description: `Composing email to ${email}`,
    })
  }

  return (
    <section className="container mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-4xl">
        <div ref={titleRef} className={`mb-6 scroll-animate ${titleVisible ? "visible" : ""}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">{name}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">{title}</p>
        </div>
        <p
          ref={descRef}
          className={`text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 scroll-animate ${descVisible ? "visible" : ""} text-pretty`}
        >
          {description}
        </p>
        <div ref={buttonsRef} className={`flex gap-4 scroll-animate ${buttonsVisible ? "visible" : ""}`}>
          {githubUrl && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full transition-smooth hover:scale-110 hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          )}
          {linkedinUrl && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full transition-smooth hover:scale-110 hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
            >
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          )}
          {email && (
            <Button
              variant="outline"
              size="icon"
              asChild
              className="rounded-full transition-smooth hover:scale-110 hover:bg-primary hover:text-primary-foreground bg-transparent cursor-pointer"
            >
              <a href={mailtoLink} onClick={handleEmailClick}>
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
