"use client"
import { use } from "react";
import { WidgetViews } from "@/modules/widget/ui/views/widget-views";

interface Props {
  searchParams: Promise<{ organizationId: string }>;
};

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);

  return (
    <WidgetViews organizationId={organizationId} />
  )
}

export default Page;