import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";

export const dynamic = 'force-static';

export default function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <HeroSection />
                <FeaturedWorkSection />
                <ClientsSection />
                <ServicesSection />
                <StatsSection />
                <AboutSection />
                <WhySection />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
