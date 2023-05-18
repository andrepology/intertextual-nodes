'use client'

import { PropsWithChildren, useState } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

import NodeNavigator from "@/components/NodeNavigator"

import { ClientProvider } from "../client/trpcClient";
import '../styles/globals.css';



export default function RootLayout(props: PropsWithChildren) {

  const [isResizing, setIsResizing] = useState(false);

  return (
    <ClientProvider>
      <html lang='en'>
        <head>
          <title>DeSci Nodes</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </head>

        <body className="w-screen h-screen">

          <p className="absolute top-1">DeSci Nodes</p>

          <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={10}>
              <NodeNavigator />
            </Panel>
            <PanelResizeHandle
              className="w-10 h-10 bg-gray-600 hover:bg-gray-700"
              onDragging={(isDragging) => setIsResizing(isDragging)}
            />
            <Panel defaultSize={50} minSize={10}>
              {props.children}
            </Panel>
          </PanelGroup>
        </body>
      </html>
    </ClientProvider>
  );
}