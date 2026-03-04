import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ConnectivityIndicator } from "@/components/connectivity-indicator";
import { AppProviders } from "@/components/app-providers";

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
  if (!arborist) {
    redirect("/onboarding");
  }

  return (
    <AppProviders>
      <div className="min-h-screen bg-background">
        <ConnectivityIndicator />
        <Sidebar arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} />
        <MobileNav arboristName={arborist.name} isaCertNum={arborist.isaCertificationNum} profilePhotoUrl={arborist.profilePhotoUrl ?? undefined} />
        <main className="pl-0 md:pl-64">
          <div className="mx-auto max-w-7xl px-4 md:px-6 pt-16 md:pt-8 pb-8">{children}</div>
        </main>
      </div>
    </AppProviders>
  );
}
