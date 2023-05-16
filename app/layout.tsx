import { PropsWithChildren, use } from "react";
import { ClientProvider } from "../client/trpcClient";
import '../styles/globals.css';



export default function RootLayout(props: PropsWithChildren) {

  return (
    <ClientProvider>
      <html lang='en'>
        <head>
          <title>Next.js hello</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
        </head>

        <body className="w-screen h-screen">
          {props.children}
        </body>
      </html>
    </ClientProvider>
  );
}