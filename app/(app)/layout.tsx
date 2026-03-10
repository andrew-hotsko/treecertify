import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ConnectivityIndicator } from "@/components/connectivity-indicator";
import { AppProviders } from "@/components/app-providers";
import { FeedbackButton } from "@/components/feedback-button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const arborist = await prisma.arborist.findUnique({
    where: { clerkUserId: userId },
  });

  // Onboarding page gets rendered without sidebar
  if (!arborist || !arborist.hasCompletedOnboarding) {
    redirect("/onboarding");
  }

  return (
    <AppProviders>
      <div className="min-h-screen bg-background">
        <ConnectivityIndicator />
        <Sidebar arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} isAdmin={process.env.ADMIN_ARBORIST_ID?.split(",").includes(arborist.id)} />
        <MobileNav arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} />
        <main className="pl-0 md:pl-64">
          <div className="mx-auto max-w-7xl px-4 md:px-6 pt-6 md:pt-8 pb-24 md:pb-8 animate-page-in">{children}</div>
        </main>
        <FeedbackButton />
      </div>
    </AppProviders>
  );
}
