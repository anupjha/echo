"use client"
import { useAtomValue, useSetAtom } from "jotai";
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { Button } from "@workspace/ui/components/button";
import { ChevronRightIcon, MessageSquareTextIcon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api"
import { useState } from "react";

export const WidgetSelectionScreen = () => {
  const setScreen = useSetAtom(screenAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom)
  const organizationId = useAtomValue(organizationIdAtom);
  const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""));
  const setConversationId = useSetAtom(conversationIdAtom)
  const createConversation = useMutation(api.public.conversations.create);
  const [isPending, setIsPending] = useState(false);

  const handleNewConversation = async () => {

    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing organization Id");
      return;
    }
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }
    setIsPending(true);
    try {
      const conversationId = await createConversation({
        contactSessionId, organizationId
      });
      setConversationId(conversationId);
      setScreen("chat");
    } catch (error) {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  }

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
      <div className="flex items-center gap-x-2">
        <Button
          className="h-16 w-full justify-between"
          variant="outline"
          disabled={isPending}
          onClick={handleNewConversation}>
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span> Start chat</span>
          </div>
          <ChevronRightIcon />
        </Button >
      </div >

    </>
  )
};