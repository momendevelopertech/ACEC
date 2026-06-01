"use client";

import { useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface Point { x: number; y: number; z: number; }

function project(p: Point, cx: number, cy: number, size: number, rx: number, ry: number): Point {
    let { x, y, z } = p;
    let u = x, v = y, w = z;
    const cosA = Math.cos(rx), sinA = Math.sin(rx);
    const cosB = Math.cos(ry), sinB = Math.sin(ry);
    let t1 = v * cosA - w * sinA;
    let t2 = v * sinA + w * cosA;
    v = t1; w = t2;
    t1 = u * cosB + w * sinB;
    t2 = -u * sinB + w * cosB;
    u = t1; w = t2;
    return { x: u * size + cx, y: v * size + cy, z: w * size };
}

interface Edge { a: number; b: number; style?: "solid" | "dash" | "faint"; }

function drawBuilding(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number,
    size: number, rx: number, ry: number,
    floors: number, alpha: number
) {
    const w = 1, h = 1, d = 0.7;
    const dh = h / floors;

    const verts: Point[] = [];
    for (let f = 0; f <= floors; f++) {
        const y = -h + f * dh * 2;
        verts.push({ x: -w, y, z: -d });
        verts.push({ x:  w, y, z: -d });
        verts.push({ x:  w, y, z:  d });
        verts.push({ x: -w, y, z:  d });
    }

    const proj = verts.map(v => project(v, cx, cy, size, rx, ry));
    const n = floors + 1;

    const solidEdges: Edge[] = [];
    const dashEdges: Edge[] = [];
    const faintEdges: Edge[] = [];

    // vertical edges
    for (let f = 0; f < floors; f++) {
        for (let c = 0; c < 4; c++) {
            solidEdges.push({ a: f * 4 + c, b: (f + 1) * 4 + c });
        }
    }
    // floor perimeters
    for (let f = 0; f <= floors; f++) {
        const base = f * 4;
        solidEdges.push({ a: base, b: base + 1 });
        solidEdges.push({ a: base + 1, b: base + 2 });
        solidEdges.push({ a: base + 2, b: base + 3 });
        solidEdges.push({ a: base + 3, b: base });
    }
    // diagonals
    faintEdges.push({ a: 0, b: n * 4 - 4 + 2 });
    faintEdges.push({ a: 1, b: n * 4 - 4 + 3 });
    faintEdges.push({ a: 0 + 2, b: n * 4 - 4 });
    faintEdges.push({ a: 0 + 3, b: n * 4 - 4 + 1 });
    // window grid per face
    for (let f = 1; f < floors; f++) {
        const base = f * 4;
        dashEdges.push({ a: base, b: base + 1, style: "dash" });
        dashEdges.push({ a: base + 1, b: base + 2, style: "dash" });
        dashEdges.push({ a: base + 2, b: base + 3, style: "dash" });
        dashEdges.push({ a: base + 3, b: base, style: "dash" });
    }

    const baseAlpha = alpha;
    ctx.strokeStyle = "#C6A66B";
    ctx.globalAlpha = baseAlpha;
    ctx.lineWidth = 1;

    for (const e of solidEdges) {
        ctx.globalAlpha = baseAlpha;
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(proj[e.a].x, proj[e.a].y);
        ctx.lineTo(proj[e.b].x, proj[e.b].y);
        ctx.stroke();
    }
    for (const e of dashEdges) {
        ctx.globalAlpha = baseAlpha * 0.5;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(proj[e.a].x, proj[e.a].y);
        ctx.lineTo(proj[e.b].x, proj[e.b].y);
        ctx.stroke();
    }
    ctx.setLineDash([]);
    for (const e of faintEdges) {
        ctx.globalAlpha = baseAlpha * 0.2;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(proj[e.a].x, proj[e.a].y);
        ctx.lineTo(proj[e.b].x, proj[e.b].y);
        ctx.stroke();
    }

    // vertex dots
    ctx.globalAlpha = baseAlpha * 0.6;
    ctx.fillStyle = "#C6A66B";
    for (const p of proj) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawGrid(ctx: CanvasRenderingContext2D, t: number) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.strokeStyle = "rgba(198,166,107,0.04)";
    ctx.lineWidth = 0.5;
    const spacing = 40;
    const offset = (t * 6) % spacing;
    for (let x = offset; x < w; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = offset; y < h; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
}

export function CTASection() {
    const t = useTranslations("cta");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let start: number | null = null;

        function resize() {
            const rect = canvas!.parentElement!.getBoundingClientRect();
            canvas!.width = rect.width;
            canvas!.height = rect.height;
        }
        resize();
        window.addEventListener("resize", resize);

        function frame(ts: number) {
            if (start === null) start = ts;
            const elapsed = (ts - start) / 1000;

            const c = ctx;
            if (!c) return;

            const w = canvas!.width;
            const h = canvas!.height;

            c.clearRect(0, 0, w, h);

            drawGrid(c, elapsed);

            drawBuilding(c, w * 0.82, h * 0.25, Math.min(w, h) * 0.14, elapsed * 0.2, elapsed * 0.4, 6, 0.2);

            drawBuilding(c, w * 0.15, h * 0.7, Math.min(w, h) * 0.1, elapsed * 0.25 + 0.5, elapsed * 0.35, 4, 0.15);

            drawBuilding(c, w * 0.5, h * 0.75, Math.min(w, h) * 0.08, elapsed * 0.3 + 1, elapsed * 0.25 + 0.8, 5, 0.12);

            animId = requestAnimationFrame(frame);
        }
        animId = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section
            ref={ref}
            className="section-pad"
            style={{
                textAlign: "center",
                background: "#3d3a34",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 300,
                            color: "#f0ede6",
                            marginBottom: "1rem",
                            lineHeight: 1.2,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {t("title")}
                    </h2>

                    <p
                        style={{
                            fontSize: "1rem",
                            color: "rgba(240,237,230,0.7)",
                            marginBottom: "2.5rem",
                            maxWidth: "480px",
                            margin: "0 auto 2.5rem",
                            lineHeight: 1.6,
                        }}
                    >
                        {t("subtitle")}
                    </p>

                    <Link
                        href={`/${locale}/contact`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.875rem 2rem",
                            borderRadius: "999px",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            background: "#C6A66B",
                            color: "#f0ede6",
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#b89555"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#C6A66B"; }}
                    >
                        {t("button")}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
