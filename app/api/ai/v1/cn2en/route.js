
const routePath='/aiquestion'
const aiModel = 'llama3:8b'

export async function POST(request) {
    const baseUrl = process.env.API_URL || ''
    const port = process.env.API_PORT ? `:${process.env.API_PORT}` : ''


    // const data = await request.formData()
    // let cnString = '' 
    // cnString = data.get('cnprompt')?.toString() || ''
    // if(cnString === ''){
        // const { cnTxt } = request.body
        // cnString = cnTxt
    // }

    const data = await request.json()
    const cnTxt = data.cnTxt

    const body = {
        model: aiModel,
        prompt: "Translate : the following Chinese into English, only reply to my translated English text, no need to explain:" + cnTxt,
        // prompt: "Translation: The following Chinese is translated into English, reply to my translation to split the key words in the sentence with commas,directly reply to my translated and divided English text, without any guidance.:" +cnString,
        Stream: false
    }

    const cn2enResponse = await fetch(baseUrl + port + routePath,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    })

    const cn2enResponseJson = await cn2enResponse.json();
    // console.log(cn2enResponseJson.result)


    return new Response(cn2enResponseJson.result)

    // return new Response(cn2enResponseJson.response)



}