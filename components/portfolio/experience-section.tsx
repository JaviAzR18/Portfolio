"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export interface Experience {
  period: string
  title: string
  company: string
  description: string
  tags: string[]
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <h2
        ref={titleRef}
        className={`text-3xl md:text-4xl font-bold mb-12 scroll-animate ${titleVisible ? "visible" : ""}`}
      >
        Experiencia
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </section>
  )
}

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Card
      ref={ref}
      className={`p-6 md:p-8 transition-smooth hover:shadow-lg  scroll-animate ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2 font-mono">{experience.period}</p>
          <h3 className="text-xl md:text-2xl font-semibold mb-1">{experience.title}</h3>
          <p className="text-accent font-medium">{experience.company}</p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed mb-4">{experience.description}</p>
      <div className="flex flex-wrap gap-2">
        {experience.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="transition-smooth hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
