'use client'

import { useState, useEffect, useTransition } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormState } from "react-dom"
import { tts } from "../_action/voice"

export function VoiceTTSForm() {
    const [state, formAction] = useFormState(tts, { error: null, audioData: null, fileName: null, mimeType: null })
    const [selectedVoice, setSelectedVoice] = useState('中文女')
    const [audioSrc, setAudioSrc] = useState(null)
    const [showAudio, setShowAudio] = useState(false)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (state.audioData && state.mimeType) {
            setAudioSrc(`data:${state.mimeType};base64,${state.audioData}`)
            setShowAudio(true)
        }
    }, [state.audioData, state.mimeType])

    const handleDownload = () => {
        if (audioSrc && state.fileName) {
            const link = document.createElement('a');
            link.href = audioSrc;
            link.download = state.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        setShowAudio(false)
        startTransition(() => {
            const formData = new FormData(event.target)
            formAction(formData)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="inputtext">输入转语音的文本：</Label>
                    <Textarea id="inputtext" name="inputtext" required />
                    {state.error?.inputtext && <div className="text-destructive">{state.error.inputtext}</div>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="timbre">选择音色：</Label>
                    <Select name="timbre" value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="选择音色" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="中文女">中文女</SelectItem>
                                <SelectItem value="中文男">中文男</SelectItem>
                                <SelectItem value="英文女">英文女</SelectItem>
                                <SelectItem value="英文男">英文男</SelectItem>
                                <SelectItem value="粤语女">粤语女</SelectItem>
                                <SelectItem value="韩语女">韩语女</SelectItem>
                                <SelectItem value="日语男">日语男</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? "转换中..." : "转换音频"}
                </Button>
            </form>

            {showAudio && audioSrc && (
                <div className="w-full mt-8 p-4 bg-gray-100 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <audio controls src={audioSrc} className="w-full sm:w-2/3"></audio>
                        <Button onClick={handleDownload} className="w-full sm:w-1/3">下载音频</Button>
                    </div>
                </div>
            )}

            {state.error?.server && (
                <div className="text-destructive mt-4">{state.error.server}</div>
            )}
        </>
    )
}