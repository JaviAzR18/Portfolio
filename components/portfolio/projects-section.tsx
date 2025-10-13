"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"

export interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <h2
        ref={titleRef}
        className={`text-3xl md:text-4xl font-bold mb-12 scroll-animate ${titleVisible ? "visible" : ""}`}
      >
        Projectos
      </h2>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 cursor-pointer hover:scale-110 transition-smooth shadow-lg bg-transparent"
          onClick={prevProject}
          aria-label="Previous project"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 cursor-pointer hover:scale-110 transition-smooth shadow-lg bg-transparent"
          onClick={nextProject}
          aria-label="Next project"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Card
      ref={ref}
      className={`p-6 md:p-8 transition-smooth hover:shadow-lg group scroll-animate ${isVisible ? "visible" : ""}`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl md:text-2xl font-semibold group-hover:text-accent transition-smooth">{project.title}</h3>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-smooth" />
          </a>
        )}
      </div>
      <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs transition-smooth hover:bg-accent hover:text-accent-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
