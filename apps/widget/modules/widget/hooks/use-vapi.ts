import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
};

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

  useEffect(() => {
    const vapiInstance = new Vapi("52d94a80-71e4-484c-90ce-a861ddbc1605")
    setVapi(vapiInstance);
    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([])
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript
          }
        ]);
      }
    });
    return () => {
      vapiInstance?.stop();
    };

  }, [])

  const startCall = () => {
    setIsConnecting(true);
    if (vapi) {
      vapi.start("eed88584-480c-41fc-8cad-1cc0abea74c5");
    }
  }
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  }
  return {
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
    transcript
  }
}