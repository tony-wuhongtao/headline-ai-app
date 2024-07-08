'use client'
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

import ThemeMenu from "@/components/theme-menu"

export default function Component() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("style1")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Error",
        description: "Please enter a prompt.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    // 这里模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)

    toast({
      title: "Success",
      description: "Image generated successfully!",
    })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-background p-6 md:w-1/2 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">文生图 Text2Image</h1>
          <ThemeMenu />
        </header>
        <div className="space-y-6">
          <div>
            <Label htmlFor="prompt">Enter your prompt</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="mt-2"
              placeholder="Describe the image you want to generate..."
            />
          </div>
          <div>
            <Label>Choose a style</Label>
            <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-2 gap-4 mt-2">
              {[1, 2, 3, 4].map((num) => (
                <Card key={num}>
                  <CardContent className="p-0">
                    <RadioGroupItem
                      value={`style${num}`}
                      id={`style${num}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`style${num}`}
                      className="block cursor-pointer rounded-md border-2 border-muted p-4 hover:border-muted-foreground peer-data-[state=checked]:border-primary"
                    >
                      <img
                        src={num % 2 === 1 ? "/ai-painting.jpg" : "/ai-teacher.jpg"}
                        alt={`Style ${num}`}
                        className="w-full h-auto object-cover rounded"
                      />
                      <span className="block mt-4 text-sm font-medium text-center">
                        Style {num}
                      </span>
                    </Label>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="bg-muted flex-1 flex items-center justify-center p-6 md:border-l">
        <Button 
          className="w-full max-w-md" 
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate Image"}
        </Button>
      </div>
    </div>
  )
}