import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { FAQ } from "@/components/sections/FAQ";
import EnhancedProjectHub from "@/components/sections/EnhancedProjectHub";
import Footer from "@/components/layout/Footer";
import Test from "@/components/layout/flowchart";
import { TestTube } from "lucide-react";
import { CaseStudies } from "@/components/sections/casestudies";
import CentralPlatform from "@/components/sections/centralplatform";

export default function Home() {
  return (
    <div className="min-h-screen">
            

      <Header />
      <Hero />
      <EnhancedProjectHub/>
      <Features />
      <Stats />
      <Test/> 
      <CentralPlatform/>
      <CaseStudies/>

      <FAQ />
      <Footer/>
    </div>
  );
}