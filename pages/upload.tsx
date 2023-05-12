import { type NextPage } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { ChatContent, type ChatItem } from "../components/Chat/ChatContent";
import { ChatInput } from "@/components/Chat/ChatInput";
import { Header } from "../components/Chat/Header";
import { api } from "../utils/api";
import ChatSide from "@/components/Chat/Chat";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Chatting from "@/components/Chat/Chatting";

const Home: NextPage = () => {
  return (
    <>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={50} minSize={50}>
            <div className="h-[100vh]">
                <Chatting />
            </div>
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

// import React, { useState } from 'react';
// import { Document, Page } from 'react-pdf';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const LeftPanel = styled.div`
//   width: 50%;
//   display: flex;
//   flex-direction: column;
// `;

// const TopLeft = styled.div`
//   width: 100%;
//   height: 25%;
//   background-color: #f5f5f5;
// `;

// const BottomLeft = styled.div`
//   width: 100%;
//   height: 25%;
//   background-color: #f5f5f5;
// `;

// const RightPanel = styled.div`
//   width: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const PDFContainer = styled.div`
//   width: 80%;
// `;

// const IndexPage: React.FC = () => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }

//   return (
//     <Container>
//       <LeftPanel>
//         <TopLeft> List of files </TopLeft>
//         <BottomLeft> Chat input field </BottomLeft>
//       </LeftPanel>
//       <RightPanel>
//         <PDFContainer>
//         <iframe src='http://localhost:8501/' width='100%' height='100%' />
//           <p>
//             Page {pageNumber} of {numPages}
//           </p>
//         </PDFContainer>
//       </RightPanel>
//     </Container>
//   );
// };

// export default IndexPage;
