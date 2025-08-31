"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetViews = ({ organizationId }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
          <p className="text-lg">Hi there 👋 </p>
          <p>How can you help today?</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">
        Widget View: {organizationId}
      </div>
      <WidgetFooter />
    </main>
  );
}

