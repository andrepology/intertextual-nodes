'use client'

import { type NextPage } from "next";

import Head from "next/head";
import { useRef, useState } from "react";
import { ChatContent, type ChatItem } from "../components/Chat/ChatContent";
import { ChatInput } from "@/components/Chat/ChatInput";
import { Header } from "../components/Chat/Header";
import { api } from "../utils/api";

import ChatSide from "@/components/Chat/Chat";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

const Home: NextPage = () => {

  const [isResizing, setIsResizing] = useState(false);

  return (
  
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={10}>
        <ChatSide />
      </Panel>
      <PanelResizeHandle
        className="w-10 h-10 bg-gray-600 hover:bg-gray-700"
        onDragging={ (isDragging) => setIsResizing(isDragging) }
      />
      <Panel defaultSize={50} minSize={10}>
        {isResizing ? null : <iframe src='anotate.pdf' width="100%" height="100%" />}
      </Panel>
    </PanelGroup>
  
  );
};

export default Home;