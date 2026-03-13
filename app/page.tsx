import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TreePine } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1D4E3E]/5 to-green-100">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#1D4E3E] p-3">
            <TreePine className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">TreeCertify</h1>
            <p className="text-sm text-neutral-500">Arborist OS</p>
          </div>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg",
              headerTitle: "text-neutral-900",
              headerSubtitle: "text-neutral-500",
              formButtonPrimary:
                "bg-[#1D4E3E] hover:bg-[#2A6B55] focus:ring-[#1D4E3E]",
            },
          }}
        />
      </div>
    </div>
  );
}
