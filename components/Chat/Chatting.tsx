import { Header } from "@/components/Chat/Header";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

const Chatting: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [gptMessage, setGptMessage] = useState<String>('');

    const prompt = message;

    const generateBio = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setGptMessage("");
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
            }),
        });
    
        if (!response.ok) {
            throw new Error(response.statusText);
        }
    
        // This data is a ReadableStream
        const data = response.body;
        if (!data) {
            return;
        }
    
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
    
        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            setGptMessage((prev) => prev + chunkValue);
        }

        setLoading(false);
    };

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>DeSci Chat Generator</title>
            </Head>

            <Header />
            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Talk to gpt
        </h1>
        <div className="max-w-xl w-full">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "What do you want to know?"
            }
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Ask &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {gptMessage && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  //ref={bioRef}
                >
                  Response
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                <p>{gptMessage}</p>
              </div>
            </>
          )}
                </div>
            </main>
        </div>
    )
}

export default Chatting;