import { Inter as FontSans } from "next/font/google"
import "@/styles/globals.css";

import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Headline AI App",
  description: "Headline AI App create by Tony @2024",
};

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//       <main className="px-8 py-5 md:py-8 lg:py-10 max-w-6xl mx-auto flex-col sm:flex-row" >
//         {children}
//       </main>        
//       </body>
//     </html>
//   );
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <ThemeProvider
            attribute="class"
            defaultTheme="orange"
            themes={['orange', 'violet','light']}
            disableTransitionOnChange            >
          <TooltipProvider>
          <main className="px-8 py-5 md:py-8 lg:py-10 max-w-6xl mx-auto flex-col sm:flex-row" >
            {children}
          </main> 
          </TooltipProvider>
        </ThemeProvider>
      </body>
    
      
    </html>
  );
}
