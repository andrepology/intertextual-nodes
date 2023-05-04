import clsx from "clsx";
import {
  KeyboardEvent,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  IconArrowDown,
  IconBolt,
  IconBrandGoogle,
  IconPlayerStop,
  IconRepeat,
  IconSend,
} from '@tabler/icons-react';

import { Prompt } from "@/types/prompt";

type Props = {
  onUpdate: (prompt: string) => void;
  onReset: () => void;
  waiting: boolean;
};

export const ChatInput = ({ onUpdate, onReset, waiting }: Props) => {
  const [prompt, setPrompt] = useState<string>("");
  const [rows, setRows] = useState<number>(2);

  useEffect(() => {
    const lines = prompt.split(/\r*\n/).length;
    setRows(Math.max(2, Math.min(lines, 5)));
  }, [prompt]);

  const handleUpdate = () => {
    setPrompt("");
    onUpdate(prompt);
  };

  return (
    <>
      <div className="border-t-2 border-t-purple-800 bg-white-900 py-2">
        <div className="container mx-auto ">
          <div className=" flex">
            <textarea
              className={clsx("w-full rounded-md bg-black p-2 text-white", {
                "opacity-50": waiting,
              })}
              placeholder="Enter a prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleUpdate();
                }
              }}
              disabled={waiting}
              rows={rows}
            />
          </div>
          <div className="my-2 flex items-center justify-between">
            <button
              className={clsx("rounded-md bg-gray-700 px-4 py-2 text-white", {
                "opacity-50": waiting,
              })}
              onClick={onReset}
              disabled={waiting}
            >
              Clear
            </button>
            <button
              className={clsx(
                "inline-flex items-center rounded-md bg-purple-800 px-4 py-2 text-white",
                {
                  "opacity-50": waiting,
                }
              )}
              onClick={handleUpdate}
              disabled={waiting}
            >
              {waiting && (
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 26C7.37258 26 2 20.6274 2 14C2 7.37258 7.37258 2 14 2"
                    stroke="white"
                    stroke-width="4"
                  />
                  <path
                    d="M14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26Z"
                    stroke="white"
                    stroke-opacity="0.3"
                    stroke-width="4"
                  />
                </svg>
              )}
              Send
            </button>
          </div>
        </div>
      </div>
      {/* <div className="absolute bottom-0 left-0 w-full border-transparent bg-gradient-to-b from-transparent via-white to-white pt-6 dark:border-white/20 dark:via-[#343541] dark:to-[#343541] md:pt-2">
        <div className="stretch mx-2 mt-4 flex flex-row gap-3 last:mb-2 md:mx-4 md:mt-[52px] md:last:mb-6 lg:mx-auto lg:max-w-3xl">
          <button
            className="absolute top-0 left-0 right-0 mx-auto mb-3 flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black hover:opacity-50 dark:border-neutral-600 dark:bg-[#343541] dark:text-white md:mb-0 md:mt-2"
            // onClick={handleStopConversation}
          ><IconPlayerStop size={16} /> Stop Generating</button>
        </div>
      </div> */}
    </>
  );
};