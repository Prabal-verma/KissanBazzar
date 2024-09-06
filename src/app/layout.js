import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider"
import ReactToast from "@/components/react-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
      <Header/>
      {children}
      <Footer/>
      </SessionProvider>
      </body>
      
    </html>
  );
}
