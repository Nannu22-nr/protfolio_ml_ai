import { About } from "@/components/sections/About";
import { AllProjects } from "@/components/sections/AllProjects";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { TechnicalLab } from "@/components/sections/TechnicalLab";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Research />
      <Experience />
      <TechnicalLab />
      <AllProjects />
      <Contact />
    </>
  );
}
