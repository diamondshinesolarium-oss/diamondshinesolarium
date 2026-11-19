import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Experience } from "@/components/sections/Experience";
import { Technology } from "@/components/sections/Technology";
import { Pricing } from "@/components/sections/Pricing";
import { Why } from "@/components/sections/Why";
import { Gallery } from "@/components/sections/Gallery";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { SafetyNotice } from "@/components/sections/Safety";

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Experience />
      <Technology />
      <Pricing showProducts={false} />
      <Why />
      <Gallery preview />
      <Reviews />
      <Location />
      <Faq />
      <SafetyNotice />
      <CtaBand />
    </>
  );
}
