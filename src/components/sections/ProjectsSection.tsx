"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant, staggerContainer, imageMaskVariant } from "@/lib/animations";

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  year: number;
  is_featured: boolean;
  location: string;
  client: string;
}

const categoryKeys = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "residential", label: { ar: "سكني", en: "Residential" } },
  { key: "commercial", label: { ar: "تجاري", en: "Commercial" } },
  { key: "industrial", label: { ar: "صناعي", en: "Industrial" } },
  { key: "education", label: { ar: "تعليمي", en: "Education" } },
  { key: "healthcare", label: { ar: "صحي", en: "Healthcare" } },
  { key: "interior", label: { ar: "داخلي", en: "Interior" } },
];

function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const isRTL = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  return (
    <motion.div
      variants={fadeUpVariant}
      whileHover={{ y: -8 }}
      className="rounded-2xl overflow-hidden bg-surface border border-border-default transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group"
    >
      <motion.div 
        variants={imageMaskVariant}
        className="relative h-[220px] overflow-hidden"
      >
        <img
          src={project.image ? `${API_BASE}/storage/${project.image}` : "/images/project-architecture-1.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
        {project.category && (
          <div
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} bg-accent/15 backdrop-blur-md border border-accent/30 rounded-full px-3 py-1 text-[0.7rem] font-semibold text-accent tracking-wider`}
          >
            {project.category}
          </div>
        )}
      </motion.div>

      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-text-primary leading-[1.3] min-h-[2.5rem]">
          {project.title || (isRTL ? "مشروع هندسي" : "Engineering Project")}
        </h3>

        {project.location && (
          <p className="text-[0.85rem] text-text-muted mt-2 flex items-center gap-1.5">
            📍 {project.location}
          </p>
        )}

        {project.year && (
          <p className="text-[0.85rem] text-text-muted mt-1 flex items-center gap-1.5">
            📅 {project.year}
          </p>
        )}

        <Link
          href={`/${locale}/projects/${project.slug}`}
          className={`inline-flex items-center gap-2 text-accent text-[0.875rem] font-semibold mt-4 transition-all duration-200 hover:gap-3 ${isRTL ? "hover:gap-3" : ""}`}
        >
          {isRTL ? "عرض التفاصيل" : "View Details"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isRTL ? "rotate-180" : ""}
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const isRTL = locale === "ar";

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/projects/${locale}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryLabel = (key: string) => {
    const cat = categoryKeys.find(c => c.key === key);
    return cat ? (isRTL ? cat.label.ar : cat.label.en) : key;
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-24 px-6 md:py-32 md:px-12 xl:px-24 bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.05)_0%,transparent_100%)] border-t border-border-default"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUpVariant} className="section-label justify-center mb-4">
            {t("title")}
          </motion.div>
          <motion.h2
            variants={fadeUpVariant}
            className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-bold text-text-primary leading-[1.2] mb-4"
          >
            {t("subtitle")}
          </motion.h2>
          <motion.p
            variants={fadeUpVariant}
            className="text-base text-text-muted max-w-[600px] mx-auto mb-8"
          >
            {t("description")}
          </motion.p>
          <motion.div variants={fadeUpVariant}>
            <Link
              href={`/${locale}/projects`}
              className="magnetic-btn magnetic-btn-primary"
            >
              {t("viewAll")} ({projects.length})
            </Link>
          </motion.div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center flex-wrap gap-3 mb-10"
        >
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full border text-[0.85rem] font-medium transition-all duration-200 cursor-pointer ${
                activeCategory === cat.key 
                  ? "border-accent bg-accent text-text-on-accent" 
                  : "border-border-default bg-transparent text-text-muted hover:border-accent hover:text-text-primary"
              }`}
            >
              {getCategoryLabel(cat.key)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center p-12">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-muted">
              {isRTL ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center p-12 bg-surface/50 border border-border-default rounded-2xl">
            <p className="text-text-muted">
              {isRTL ? "لا توجد مشاريع في هذا التصنيف" : "No projects in this category"}
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
