"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Label for the section that crashed (e.g. "Map View", "Report Editor") */
  sectionName?: string;
  /** Optional fallback UI — if omitted, a default card is rendered */
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches unhandled errors in child components
 * and renders a recovery UI instead of a blank screen.
 *
 * Must be a class component — React does not support error boundaries
 * with hooks.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `[ErrorBoundary] ${this.props.sectionName ?? "Component"} crashed:`,
      error,
      errorInfo.componentStack
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReportIssue = () => {
    // Click the floating feedback button if it exists
    const feedbackBtn = document.querySelector<HTMLButtonElement>(
      "[data-feedback-trigger]"
    );
    if (feedbackBtn) {
      feedbackBtn.click();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const sectionLabel = this.props.sectionName ?? "This section";

      return (
        <div className="flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {sectionLabel} encountered an error
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Something went wrong while rendering this section. Your data is safe.
              </p>
              {this.state.error && (
                <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted rounded px-3 py-2 break-all">
                  {this.state.error.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleRetry} variant="default" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button
                onClick={this.handleReportIssue}
                variant="outline"
                size="sm"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
