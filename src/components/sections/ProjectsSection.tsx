"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

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
  area?: string;
}

const categoryKeys = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "commercial", label: { ar: "تجاري", en: "Commercial" } },
  { key: "residential", label: { ar: "سكني", en: "Residential" } },
  { key: "industrial", label: { ar: "صناعي", en: "Industrial" } },
  { key: "safety", label: { ar: "سلامة", en: "Safety" } },
  { key: "interior", label: { ar: "تصميم داخلي", en: "Interior" } },
  { key: "recreational", label: { ar: "ترفيهي", en: "Recreational" } },
  { key: "educational", label: { ar: "تعليمي", en: "Educational" } },
];

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B695A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B695A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 3v18" />
    </svg>
  );
}

function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const imgSrc = `/images/projects/${project.slug}.jpg`;

  return (
    <div className="project-card">
      <div className="card-image">
        <img src={imgSrc} alt={project.title} loading="lazy" />
        {project.category && (
          <span className="badge">{project.category}</span>
        )}
      </div>
      <div className="card-body">
        <h3>{project.title}</h3>
        <div className="card-meta">
          {project.location && (
            <span className="meta-item">
              <LocationIcon />
              {project.location}
            </span>
          )}
          {project.area && (
            <span className="meta-item">
              <AreaIcon />
              {project.area}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const PROJECTS_PER_PAGE = 6;

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

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

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [activeCategory]);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + PROJECTS_PER_PAGE, filteredProjects.length));
  };

  const getCategoryLabel = (key: string) => {
    const cat = categoryKeys.find(c => c.key === key);
    return cat ? (isRTL ? cat.label.ar : cat.label.en) : key;
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="projects-section relative py-24 px-6 md:py-32 md:px-12 xl:px-24 bg-[linear-gradient(135deg,rgba(var(--color-accent-rgb),0.05)_0%,transparent_100%)] border-t border-border-default"
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
                  : "border-border-default bg-transparent text-text-muted hover:border-accent hover:text-[var(--brand-dark)]"
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
          <>
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </motion.div>

            {/* Pagination / Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4 mt-12"
            >
              <p className="text-text-muted text-[0.85rem]">
                {isRTL
                  ? `عرض ${visibleCount} من ${filteredProjects.length} مشروع`
                  : `Showing ${visibleCount} of ${filteredProjects.length} projects`}
              </p>
              {hasMore && (
                <motion.button
                  onClick={loadMore}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-accent/40 bg-accent/5 text-accent font-semibold text-[0.95rem] cursor-pointer transition-all duration-300 overflow-hidden hover:bg-accent hover:text-text-on-accent hover:border-accent"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isRTL ? "تحميل المزيد" : "Load More"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-y-0.5"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </span>
                </motion.button>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
