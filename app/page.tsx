import { HeroSection } from "@/components/portfolio/hero-section"
import { ExperienceSection, type Experience } from "@/components/portfolio/experience-section"
import { SkillsSection, type SkillCategory } from "@/components/portfolio/skills-section"
import { ProjectsSection, type Project } from "@/components/portfolio/projects-section"
import { ThemeToggle } from "@/components/portfolio/theme-toggle"
import { Footer } from "@/components/portfolio/footer"

// Example data - Replace with your own information
const personalInfo = {
  name: "Javier Aznar Ruiz",
  title: "Full Stack Developer & Data/AI Enthusiast",
  description:
    "I'm a passionate developer who loves building beautiful, functional, and user-friendly web applications. With 5+ years of experience in modern web technologies, I transform ideas into elegant digital solutions that make a real impact. I specialize in creating seamless user experiences and scalable architectures.",
  githubUrl: "https://github.com/JaviAzR18/",
  linkedinUrl: "https://www.linkedin.com/in/javier-aznar-ruiz/",
  email: "javieraznarruiz@gmail.com",
}

const experiences: Experience[] = [
  {
    period: "2022 — Present",
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    description:
      "Leading development of scalable web applications using modern technologies. Architecting cloud-native solutions and mentoring junior developers. Successfully reduced application load time by 60% and improved overall system reliability.",
    tags: ["React", "Node.js", "AWS", "TypeScript", "PostgreSQL"],
  },
  {
    period: "2018 — 2020",
    title: "Junior Developer",
    company: "StartUp Labs",
    description:
      "Developed features for multiple client projects across various industries. Gained experience in full-stack development and agile methodologies. Contributed to 10+ successful product launches.",
    tags: ["JavaScript", "Vue.js", "Express", "MongoDB"],
  },
]

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "MongoDB", "Firebase", "SQL"],
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Jira"],
  },
]

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with payment integration, inventory management, and real-time analytics. Handles 10,000+ daily active users with 99.9% uptime.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma", "Redis"],
    link: "https://example.com",
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering capabilities. Features drag-and-drop interface and smart notifications.",
    tags: ["React", "Firebase", "Material-UI", "WebSockets"],
    link: "https://example.com",
  },
  {
    title: "AI Content Generator",
    description:
      "AI-powered content creation tool that helps marketers generate blog posts, social media content, and ad copy. Integrates with OpenAI GPT-4 for high-quality outputs.",
    tags: ["TypeScript", "OpenAI", "Tailwind CSS", "Next.js"],
    link: "https://example.com",
  },
  {
    title: "Portfolio Builder",
    description:
      "No-code portfolio builder that allows creatives to showcase their work with customizable templates and themes. Features drag-and-drop editor and one-click deployment.",
    tags: ["Next.js", "Supabase", "Framer Motion", "Vercel"],
    link: "https://example.com",
  },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen gradient-bg transition-smooth-slow">
      <ThemeToggle />
      <HeroSection
        name={personalInfo.name}
        title={personalInfo.title}
        description={personalInfo.description}
        githubUrl={personalInfo.githubUrl}
        linkedinUrl={personalInfo.linkedinUrl}
        email={personalInfo.email}
      />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <SkillsSection skillCategories={skillCategories} />
      <Footer
        name={personalInfo.name}
        githubUrl={personalInfo.githubUrl}
        linkedinUrl={personalInfo.linkedinUrl}
        email={personalInfo.email}
      />
    </div>
  )
}
