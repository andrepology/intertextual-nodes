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
  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={50}>
          <ChatSide />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={50} minSize={50}>
          <iframe src='anotate.pdf' width="100%" height="100%" />
        </Panel>
      </PanelGroup>
    </>
  );
};

export default Home;

// import { type NextPage } from "next";
// import Head from "next/head";
// import { useRef, useState } from "react";
// import { ChatContent, type ChatItem } from "../components/Chat/ChatContent";
// import { ChatInput } from "@/components/Chat/ChatInput";
// import { Header } from "../components/Chat/Header";
// import { api } from "../utils/api";
// import ChatSide from "@/components/Chat/Chat";
// import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
// import Chatting from "@/components/Chat/Chatting";

// const Home: NextPage = () => {
//   return (
//     <>
//       <PanelGroup direction="horizontal">
//         <Panel defaultSize={50} minSize={50}>
//           {/* <iframe src='http://localhost:8501/' width='100%' height='100%' /> */}
//           <ChatSide />
//           {/* <Chatting /> */}
//         </Panel>
//         <PanelResizeHandle />
//         <Panel defaultSize={50} minSize={50}>
//           <iframe src='anotate.pdf' width="100%" height="100%" />
//         </Panel>
//       </PanelGroup>
//     </>
//   );
// };

// export default Home;