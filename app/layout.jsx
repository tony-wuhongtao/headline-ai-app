import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Headline AI App",
  description: "Headline AI App create by Tony @2024",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="px-8 py-5 md:py-8 lg:py-10 max-w-6xl mx-auto flex-col sm:flex-row" >
        {children}
      </main>        
      </body>
    </html>
  );
}
