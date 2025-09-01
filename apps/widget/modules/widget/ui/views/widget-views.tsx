"use client";

import { useAtomValue } from "jotai";
import { WidgetAuthScreen } from "../screens/widget-auth-screen";
import { screenAtom } from "../../atoms/widget-atoms";


interface Props {
  organizationId: string;
}

export const WidgetViews = ({ organizationId }: Props) => {
  const screen = useAtomValue(screenAtom);

  const screenComponents = {
    "error": <p>TODO: Error</p>,
    "loading": <p>TODO: Loading</p>,
    "selection": <p>TODO: Selection</p>,
    "voice": <p>TODO: Voice</p>,
    "auth": <WidgetAuthScreen />,
    "inbox": <p>TODO: Inbox</p>,
    "chat": <p>TODO: Chat</p>,
    "contact": <p>TODO: Contact</p>,
  }

  return (
    <main className="min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
}

