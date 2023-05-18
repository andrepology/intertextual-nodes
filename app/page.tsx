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

const NodeHome: NextPage = () => {

  return (
  
    <div>
      Node Home
    </div>
  
  );
};

export default NodeHome;