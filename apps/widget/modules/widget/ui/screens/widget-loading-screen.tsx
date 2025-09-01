"use client"
import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react"
import { WidgetHeader } from "../components/widget-header";
import { organizationIdAtom, errorMessageAtom, loadingMessageAtom, screenAtom, contactSessionIdAtomFamily } from "../../atoms/widget-atoms";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

type InitStep = "org" | "session" | "settings" | "vapi" | "done";

export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
  const [step, setStep] = useState<InitStep>("org");
  const [sessionValid, setSessionValid] = useState(false);
  const loadingMessage = useAtomValue(loadingMessageAtom);
  const setOrganizationId = useSetAtom(organizationIdAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const setLoadingMessage = useSetAtom(loadingMessageAtom);
  const setScreen = useSetAtom(screenAtom);
  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))


  const validateOrganization = useAction(api.public.organization.validate);

  // Step 1 : Validate Organization
  useEffect(() => {
    if (step != "org") {
      return;
    }
    setLoadingMessage("Finding organizaation...");
    if (!organizationId) {
      setErrorMessage("Organization Id is required");
      setScreen("error");
      return;
    }
    setLoadingMessage("Verifying organization...")

    validateOrganization({ organizationId })
      .then((result) => {
        if (result.valid) {
          setOrganizationId(organizationId)
          setStep("session");
        }
        else {
          setErrorMessage(result.reason || "Invalid configuration");
          setScreen("error");
        }
      })
      .catch(() => {
        setErrorMessage("Unable to verify organization");
        setScreen("error");
      })
  }, [step, organizationId, setErrorMessage, setScreen, setOrganizationId, setStep, validateOrganization, setLoadingMessage])

  // Step 2 : Validate session if exists
  const validateContactSession = useMutation(api.public.contactSession.validate)
  useEffect(() => {
    if (step !== "session") {
      return;
    }
    setLoadingMessage("Finding contact session...")
    if (!contactSessionId) {
      setSessionValid(false);
      setStep("done");
      return;
    }
    setLoadingMessage("Validating session...");

    validateContactSession({
      contactSessionsId: contactSessionId,
    }).then((result) => {
      setSessionValid(result.valid);
      setStep("done");
    })
      .catch(() => {
        setSessionValid(false);
        setStep("done");
      })

  }, [step, contactSessionId, validateContactSession, setLoadingMessage]);

  useEffect(() => {
    if (step !== "done") {
      return;
    }
    const hasValidSession = contactSessionId && sessionValid;
    setScreen(hasValidSession ? "selection" : "auth");
  }, [step, contactSessionId, sessionValid, setScreen])

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
        <LoaderIcon className="animate-spin" />
        <p className="text-sm">
          {loadingMessage || "loading"}
        </p>
      </div >

    </>
  )
};