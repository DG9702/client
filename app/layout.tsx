'use client'
import { Roboto } from "next/font/google";
import {Josefin_Sans} from "next/font/google";
import {Toaster} from 'react-hot-toast';
import {ThemeProvider} from './utils/theme-provider';
import {Providers} from './Provider';
import { SessionProvider } from 'next-auth/react';
import {useLoadUserQuery} from '@/redux/features/api/apiSlice';
import Loader from './components/Loader/Loader';
import './globals.css'
import {useEffect} from "react";

import socketIO from "socket.io-client";
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId=socketIO(ENDPOINT,{transports:["websocket"]})

const robotos = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-Roboto",
})

const josefin=Josefin_Sans({
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${robotos.variable} ${josefin.variable} bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-black dark:to-black dark:bg-slate-900 duration-300`}>
        <Providers>
          <SessionProvider>
            <ThemeProvider 
              attribute='class' 
              defaultTheme='system' 
              enableSystem
            >
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}

const Custom:  React.FC<{children:React.ReactNode}> = ({children}) => {
  const {isLoading}=useLoadUserQuery({});
  useEffect(() => {
    socketId.on("connection", () => {})
  }, []);
  return (
    <>
      {isLoading ? <Loader  /> : <>{children}</>}
    </>
  )
}
