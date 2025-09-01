"use client"
import { useAtomValue } from "jotai";
import { AlertTriangleIcon } from "lucide-react"
import { errorMessageAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";

export const WidgetErrorScreen = () => {
  const errorMessage = useAtomValue(errorMessageAtom);

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semiboild ">
          <p className="text-3xl">
            Hi there! <span className="wave">👋</span>
          </p>
          <p className="text-lg">Let's get you started...</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon />
        <p className="text-sm">
          {errorMessage || "Invalid configuration. Please reach out to support."}
        </p>
      </div>

    </>
  )
};