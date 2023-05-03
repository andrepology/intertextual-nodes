import { ChatInput } from "./ChatInput"
import { ChatContent } from "./ChatContent"
import { Header } from "./Header"
import { ChatItem } from "./ChatContent";
import { useState, useRef } from "react";
import { api } from "@/utils/api";

export default function ChatSide () {
    const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [waiting, setWaiting] = useState<boolean>(false);
  const scrollToRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(
      () => scrollToRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  const generatedTextMutation = api.ai.generateText.useMutation({
    onSuccess: (data: any) => {
      setChatItems([
        ...chatItems,
        {
          content: data.generatedText,
          author: "AI",
        },
      ]);
    },

    onError: (error) => {
      setChatItems([
        ...chatItems,
        {
          content: error.message ?? "An error occurred",
          author: "AI",
          isError: true,
        },
      ]);
    },

    onSettled: () => {
      setWaiting(false);
      scrollToBottom();
    },
  });

  const resetMutation = api.ai.reset.useMutation();

  const handleUpdate = (prompt: string) => {
    setWaiting(true);

    setChatItems([
      ...chatItems,
      {
        content: prompt.replace(/\n/g, "\n\n"),
        author: "User",
      },
    ]);

    scrollToBottom();

    generatedTextMutation.mutate({ prompt });
  };

  const handleReset = () => {
    setChatItems([]);
    resetMutation.mutate();
  };

    return (
        <div className="flex h-screen flex-col items-center bg-white-800">
        <section className="w-full">
          <Header />
        </section>

        <section className="w-full flex-grow overflow-y-scroll">
          <ChatContent chatItems={chatItems} />
          <div ref={scrollToRef} />
        </section>

        <section className="w-full">
          <ChatInput
            onUpdate={handleUpdate}
            onReset={handleReset}
            waiting={waiting}
          />
        </section>
      </div>
    )
}