"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  year: number;
  location: string;
  client: string;
  is_featured: boolean;
}

interface ProjectsSectionProps {
  showHeader?: boolean;
}

const PROJECTS_PER_PAGE = 6;

export function ProjectsSection({ showHeader = false }: ProjectsSectionProps) {
  const locale = useLocale();
  const t = useTranslations("projects");
  const isRtl = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/projects/${locale}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ["all", ...Array.from(cats)];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  useEffect(() => {
    setVisibleCount(PROJECTS_PER_PAGE);
  }, [activeCategory]);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const visibleProjects = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + PROJECTS_PER_PAGE, filtered.length));
  };

  return (
    <section
      ref={ref}
      id="projects"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ backgroundColor: "#f0ede6", padding: showHeader ? "0 0 5rem" : "5rem 0" }}
    >
      <div className="container-custom">
        {/* Page Header */}
        {showHeader && (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="projects-page-header"
          >
            <h1 className="projects-page-title">
              {isRtl ? "مشاريعنا" : "Projects"}
            </h1>
            <p className="projects-page-subtitle">
              {isRtl
                ? "مجموعة مختارة من المشاريع الحديثة والمستمرة في جميع أنحاء المملكة."
                : "A selection of recent and ongoing engagements across the Kingdom."}
            </p>
          </motion.div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <div
              className="w-10 h-10 rounded-full border-2 border-r-transparent animate-spin"
              style={{ borderColor: "#C6A66B", borderRightColor: "transparent" }}
            />
            <p style={{ color: "#8a8278", fontSize: "0.9rem" }}>
              {isRtl ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        ) : (
          <>
            {/* Filter Bar */}
            {categories.length > 1 && (
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="projects-filter"
              >
                {categories.map((cat, i) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.05 * i }}
                    className={`projects-filter-btn ${activeCategory === cat ? "active" : ""}`}
                  >
                    {cat === "all" ? t("all") : cat}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Project Grid */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="projects-grid"
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/${locale}/projects/${project.slug}`}
                      className="project-card-link"
                    >
                      <article className="project-card">
                        <div className="project-card-image-wrap">
                          <img
                            src={
                              project.image
                                ? `${API_BASE}/storage/${project.image}`
                                : `/images/projects/${project.slug}.jpg`
                            }
                            alt={project.title}
                            loading="lazy"
                            className="project-card-img"
                          />
                        </div>
                        <div className="project-card-meta">
                          <span className="project-card-category">
                            {project.category.toUpperCase()}
                          </span>
                          <span className="project-card-location">
                            {project.location}
                            {project.year ? ` · ${project.year}` : ""}
                          </span>
                        </div>
                        <h3 className="project-card-title">
                          {project.title}
                        </h3>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p style={{ color: "#8a8278", fontSize: "0.9rem" }}>
                  {isRtl ? "لا توجد مشاريع في هذا التصنيف" : "No projects in this category"}
                </p>
              </div>
            )}

            {/* Pagination / Load More */}
            {filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-4 mt-12"
              >
                <p style={{ color: "#8a8278", fontSize: "0.85rem" }}>
                  {isRtl
                    ? `عرض ${visibleCount} من ${filtered.length} مشروع`
                    : `Showing ${visibleCount} of ${filtered.length} projects`}
                </p>
                {hasMore && (
                  <button
                    onClick={loadMore}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.85rem 2rem",
                      borderRadius: "999px",
                      border: "1px solid rgba(198,166,107,0.4)",
                      backgroundColor: "rgba(198,166,107,0.05)",
                      color: "#C6A66B",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "#C6A66B";
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "#C6A66B";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "rgba(198,166,107,0.05)";
                      e.currentTarget.style.color = "#C6A66B";
                      e.currentTarget.style.borderColor = "rgba(198,166,107,0.4)";
                    }}
                  >
                    {isRtl ? "تحميل المزيد" : "Load More"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={isRtl ? { transform: "scaleX(-1)" } : {}}
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </motion.div>
            )}

            {/* Homepage: "View All" link (when all projects already shown) */}
            {!showHeader && !hasMore && filtered.length > 0 && (
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-center mt-12"
              >
                <Link
                  href={`/${locale}/projects`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#4a4540",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    paddingBottom: "0.25rem",
                    borderBottom: "1px solid rgba(74,69,64,0.3)",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#8a7a5a";
                    e.currentTarget.style.borderBottomColor = "rgba(138,122,90,0.3)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#4a4540";
                    e.currentTarget.style.borderBottomColor = "rgba(74,69,64,0.3)";
                  }}
                >
                  {isRtl ? "عرض جميع المشاريع" : "View All Projects"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={isRtl ? { transform: "scaleX(-1)" } : {}}
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>

      <style>{`
        .projects-page-header {
          padding-top: 4rem;
          padding-bottom: 0;
          text-align: center;
        }

        .projects-page-title {
          font-size: clamp(2.5rem, 4vw, 3rem);
          font-family: var(--font-serif, Georgia, serif);
          color: #2e2b26;
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }

        .projects-page-subtitle {
          color: #8a8278;
          font-size: 1rem;
          margin-top: 1rem;
          margin-bottom: 3.75rem;
          line-height: 1.6;
        }

        .projects-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }

        .projects-filter-btn {
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          border: 1px solid #ddd8d0;
          background: transparent;
          color: #4a4540;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .projects-filter-btn:hover {
          border-color: #C6A66B;
          color: #C6A66B;
          background: rgba(198, 166, 107, 0.05);
        }

        .projects-filter-btn.active {
          background: #C6A66B;
          border-color: #C6A66B;
          color: #fff;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 28px;
          }
        }

        @media (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
          }
        }

        .project-card-link {
          text-decoration: none;
          display: block;
          cursor: pointer;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        .project-card-image-wrap {
          overflow: hidden;
          border-radius: 3px;
          width: 100%;
        }

        .project-card-img {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          transition: transform 0.5s ease;
          border-radius: 2px;
        }

        .project-card-link:hover .project-card-img {
          transform: scale(1.02);
        }

        .project-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.65rem;
          width: 100%;
        }

        .project-card-category {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a8278;
          font-weight: 500;
        }

        .project-card-location {
          font-size: 0.65rem;
          color: #8a8278;
          text-align: right;
        }

        [dir=rtl] .project-card-meta {
          direction: ltr;
        }

        [dir=rtl] .project-card-category {
          order: 1;
        }

        [dir=rtl] .project-card-location {
          order: 0;
        }

        .project-card-title {
          font-size: 1rem;
          font-weight: 500;
          color: #2e2b26;
          font-family: var(--font-serif, Georgia, serif);
          margin: 4px 0 0;
          line-height: 1.3;
        }

        [dir=rtl] .project-card-title {
          text-align: right;
        }
      `}</style>
    </section>
  );
}
