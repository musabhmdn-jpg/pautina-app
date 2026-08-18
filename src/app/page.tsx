import { AppHeader } from "@/components/layout/app-header";
import { Hero } from "@/components/landing/hero";
import { VerificationSteps } from "@/components/landing/verification-steps";
import { OpportunitiesFeed } from "@/components/landing/opportunities-feed";
import { SiteFooter } from "@/components/layout/site-footer";

export default function LandingPage() {
  return (
    <>
      <AppHeader />
      <main className="flex-1">
        <Hero />
        <VerificationSteps />
        <OpportunitiesFeed />
      </main>
      <SiteFooter />
    </>
  );
}
