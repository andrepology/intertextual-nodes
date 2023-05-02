import { useToast } from "@apideck/components";
import { ChatCompletionRequestMessage } from "openai";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { sendMessage } from "@/pages/api/chat/sendMessage";

interface ContextProps {
  messages: ChatCompletionRequestMessage[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<ContextProps>({
  messages: [],
  addMessage: async () => {},
  isLoadingAnswer: false,
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      const systemMessage: ChatCompletionRequestMessage = {
        role: 'system',
        content: 'You are ChatGPT, a large language model trained by OpenAI',
      };
      const welcomeMessage: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: 'Hi, how can I help you today?',
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    if (messages.length === 0) {
      initializeChat();
    }
  }, [messages]);

  const addMessage = async (content: string) => {
    setIsLoadingAnswer(true);
    try {
      const newMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content,
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      const { data } = await sendMessage(newMessages);
      const reply = data.choices[0].text;
      const newReply: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: reply,
      };
      setMessages([...newMessages, newReply]);
    } catch (error: any) {
      addToast({ title: 'An error occurred', type: 'error' });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <ChatsContext.Provider value={{ messages, addMessage, isLoadingAnswer }}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps
}