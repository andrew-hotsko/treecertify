"use client";

import { ErrorBoundary } from "@/components/error-boundary";

export default function ReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary sectionName="Report Editor">
      {children}
    </ErrorBoundary>
  );
}
