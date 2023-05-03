import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { ChatContent, type ChatItem } from "../components/Chat/ChatContent";
import { ChatInput } from "@/components/Chat/ChatInput";
import { Header } from "../components/Chat/Header";
import { api } from "../utils/api";
import ChatSide from "@/components/Chat/Chat";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/2">
          <ChatSide />
        </div>
        <div className="w-1/2">
          <iframe src='anotate.pdf' width="100%" height="100%" />
        </div>
      </div>
    </>
  );
};

export default Home;