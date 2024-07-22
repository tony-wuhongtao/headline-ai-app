"use server"
import {z} from 'zod'

const ttsSchema = z.object({
    inputtext: z.string().min(1),
    timbre: z.string().min(1)
})

const routePath = '/tts'
const apiUrl = 'http://192.168.99.18:9233'

export async function tts(prevState,formData) {

    const result = ttsSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const validatedData  = result.data

    const body = {
        text: validatedData.inputtext,
        role: validatedData.timbre
    }
    console.log(JSON.stringify(body))

    try {
        const response = await fetch(apiUrl + routePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        // Get the audio data as an ArrayBuffer
        const audioBuffer = await response.arrayBuffer()
        
        // Get the filename from the Content-Disposition header, or use a default
        const contentDisposition = response.headers.get('Content-Disposition')
        let fileName = 'audio.wav'
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/)
            if (fileNameMatch) {
                fileName = fileNameMatch[1]
            }
        }

        // Convert ArrayBuffer to Base64
        const base64Audio = Buffer.from(audioBuffer).toString('base64')
        const mimeType = response.headers.get('Content-Type') || 'audio/wav'

        return { 
            audioData: base64Audio, 
            fileName: fileName,
            mimeType: mimeType
        }
    } catch (error) {
        console.error('Error:', error)
        return { error: { server: error.message } }
    }

}