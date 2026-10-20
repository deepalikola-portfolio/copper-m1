import {
  Hero,
  PlusPricing,
  PrivacySummary,
  Products,
  Showcase,
} from "@/components/copper/landing-sections";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Products />
        <Showcase />
        <PlusPricing />
        <PrivacySummary />
      </main>
      <SiteFooter />
    </>
  );
}
