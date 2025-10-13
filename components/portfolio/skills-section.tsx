"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export interface SkillCategory {
  category: string
  skills: string[]
}

interface SkillsSectionProps {
  skillCategories: SkillCategory[]
}

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  return (
    <section className="container mx-auto px-6 py-16 md:py-24">
      <h2
        ref={titleRef}
        className={`text-3xl md:text-4xl font-bold mb-12 scroll-animate ${titleVisible ? "visible" : ""}`}
      >
        Stack & Skills
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((item, index) => (
          <SkillCard key={item.category} skillCategory={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function SkillCard({ skillCategory, index }: { skillCategory: SkillCategory; index: number }) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <Card
      ref={ref}
      className={`p-6 transition-smooth hover:shadow-lg scroll-animate ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-xl font-semibold mb-4 text-primary">{skillCategory.category}</h3>
      <div className="flex flex-wrap gap-2">
        {skillCategory.skills.map((skill) => (
          <Badge
            key={skill}
            variant="outline"
            className="transition-smooth hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  )
}
