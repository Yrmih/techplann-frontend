import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { FooterLanding } from "@/components/landing/FooterLanding";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
     
      <Hero /> 

      
      <Features /> 

     
      <Pricing /> 

     
      <Testimonials /> 

     
      <CTA /> 

      
      <FooterLanding />
    </main>
  );
}