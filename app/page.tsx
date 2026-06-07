import { AboutShowreel } from "@/components/about-showreel";
import { ContactFooter } from "@/components/contact-footer";
import { Hero } from "@/components/hero";
import { PinkBand } from "@/components/pink-band";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutShowreel />
      <Projects />
      <PinkBand />
      <ContactFooter />
    </main>
  );
}
