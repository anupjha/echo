"use client";

import { WidgetAuthScreen } from "../screens/widget-auth-screen";

// import { WidgetFooter } from "../components/widget-footer";
// import { WidgetHeader } from "../components/widget-header";


interface Props {
  organizationId: string;
}

export const WidgetViews = ({ organizationId }: Props) => {
  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {/* <WidgetHeader>

      </WidgetHeader> */}

      {/* <WidgetFooter /> */}
      <WidgetAuthScreen />
    </main>
  );
}

