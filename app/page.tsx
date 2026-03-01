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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-600 p-3">
            <TreePine className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">TreeCertify</h1>
            <p className="text-sm text-gray-500">Arborist OS</p>
          </div>
        </div>
        <SignIn
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg",
              headerTitle: "text-gray-900",
              headerSubtitle: "text-gray-500",
              formButtonPrimary:
                "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-600",
            },
          }}
        />
      </div>
    </div>
  );
}
