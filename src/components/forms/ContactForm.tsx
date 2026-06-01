"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { submitContactForm } from "@/lib/contactFormService";

export function ContactForm() {
    const t = useTranslations("contact");
    const locale = useLocale();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service_interest: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await submitContactForm({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                service_type: formData.service_interest,
                lang: locale,
            });

            if (response.success) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", subject: "", message: "", service_interest: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setErrorMessage(response.error || "Failed to submit contact form");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "An unexpected error occurred");
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-xl)",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
        >
            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#C6A66B", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {t("name")}
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("name")}
                        className="form-input"
                    />
                </div>
                <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "#C6A66B", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {t("email")}
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t("email")}
                        className="form-input"
                    />
                </div>
            </div>

            {/* Subject */}
            <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#A88B52", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {t("subject")}
                </label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={t("subject")}
                    className="form-input"
                />
            </div>

            {/* Phone */}
            <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#A88B52", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {t("phone")}
                </label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("phone_placeholder")}
                    className="form-input"
                />
            </div>

            {/* Service */}
            <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#A88B52", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {t("service")}
                </label>
                <select
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: "pointer" }}
                >
                    <option value="">{t("select_service")}</option>
                    <option value="consulting">{t("opt_consulting")}</option>
                    <option value="safety">{t("opt_safety")}</option>
                    <option value="supervision">{t("opt_supervision")}</option>
                    <option value="interior">{t("opt_interior")}</option>
                    <option value="factory">{t("opt_factory")}</option>
                    <option value="modon">{t("opt_modon")}</option>
                </select>
            </div>

            {/* Message */}
            <div>
                <label style={{ display: "block", fontSize: "0.75rem", color: "#A88B52", marginBottom: "0.5rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {t("message")}
                </label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t("message")}
                    className="form-input"
                    style={{ resize: "vertical" }}
                />
            </div>

            {/* Status messages */}
            {status === "success" && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(198, 166, 107, 0.1)",
                        border: "1px solid rgba(198, 166, 107, 0.3)",
                        color: "#1A1A1A",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        fontWeight: 500,
                    }}
                >
                    ✓ {t("success")}
                </div>
            )}
            {status === "error" && (
                <div
                    style={{
                        padding: "1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(200, 50, 50, 0.08)",
                        border: "1px solid rgba(200, 50, 50, 0.2)",
                        color: "#dc2626",
                        fontSize: "0.9rem",
                        textAlign: "center",
                    }}
                >
                    ✕ {errorMessage || t("error")}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "loading"}
                style={{
                    width: "100%",
                    fontSize: "1rem",
                    padding: "1rem",
                    borderRadius: "12px",
                    fontWeight: 600,
                    cursor: status === "loading" ? "wait" : "pointer",
                    opacity: status === "loading" ? 0.7 : 1,
                    background: "#C6A66B",
                    color: "#FFFFFF",
                    border: "none",
                    transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = "#B89555"; }}
                onMouseLeave={(e) => { if (status !== "loading") e.currentTarget.style.background = "#C6A66B"; }}
            >
                {status === "loading"
                    ? t("sending")
                    : t("submit")}
            </button>

            <style>{`
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        select option {
          background: var(--color-surface);
          color: var(--color-text-primary);
        }
      `}</style>
        </motion.form>
    );
}
