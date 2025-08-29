"use client"
import { Button } from "@workspace/ui/components/button"
import { useVapi } from "@/modules/widget/hooks/use-vapi"


export default function Page() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    startCall,
    endCall,
    transcript } = useVapi();
  return (
    <div className="flex items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button onClick={() => endCall()} variant="destructive">End Call</Button>
      <h4>isConnected: {`${isConnected}`}</h4>
      <h4>isConnecting: {`${isConnected}`}</h4>
      <h4>isSpeaking: {`${isSpeaking}`}</h4>
      <h4>{JSON.stringify(transcript,)}</h4>
      <h1>aaps/widget!</h1>
    </div>
  )
}
