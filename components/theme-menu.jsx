import React from 'react'
import { Palette  } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const ThemeMenu = () => {

    const { setTheme, themes } = useTheme()
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <Palette className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {themes.map(theme=>(
        <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
          {theme}
        </DropdownMenuItem>
      )

      )}

    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default ThemeMenu