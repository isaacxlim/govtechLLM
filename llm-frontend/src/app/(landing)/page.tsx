import { LandingHero } from "@/components/landing-hero";
import { Navbar } from "@/components/navbar";

const LandingPage = () => {
    return (
        <div className="h-full">
            <Navbar />
            <LandingHero />
        </div>
    );
};

export default LandingPage;
