import { About } from "@/components/about";
import { ContactFooter } from "@/components/contact-footer";
import { Designs } from "@/components/designs";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { ScrollToHash } from "@/components/scroll-to-hash";

export default function Home() {
    return (
        <main>
            <ScrollToHash />
            <Hero />
            <About />
            <Projects />
            <Designs />
            <ContactFooter />
        </main>
    );
}