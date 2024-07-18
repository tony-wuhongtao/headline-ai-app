
const routePath='/sddrawing'

export async function POST(request) {
    const baseUrl = process.env.API_URL || ''
    const port = process.env.API_PORT ? `:${process.env.API_PORT}` : ''

    const data = await request.json();
    
    // const customPrompt = data.get('enprompt')?.toString() || ''
    // const sd_model_checkpoint = data.get('modelname')?.toString() || ''


    //预设参数
    // const prePrompt = data.get('preprompt')?.toString() || ''
    // const postPrompt = data.get('postprompt')?.toString() || ''
    // const negative_prompt = data.get('nagetive')?.toString() || ''
    // const sampler_index = data.get('samplerindex')?.toString() || ''
    // const steps = data.get('steps')?.toString() || ''

    //合成prompt
    // const prompt = prePrompt + customPrompt + postPrompt

    // const body : Txt2img = {
    //     prompt,
    //     negative_prompt,
    //     steps: parseInt(steps),
    //     sampler_index,
    //     override_settings:{
    //         sd_model_checkpoint
    //     }
    // }

    // console.log(data)

    const txt2imgRes = await fetch(baseUrl + port + routePath,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })

    const txt2imgResponseJson = await txt2imgRes.json();

    // console.log("txt2imgResponseJson in api", txt2imgResponseJson);
    if (txt2imgResponseJson.error) {
        return new Response(JSON.stringify(txt2imgResponseJson), {
        status: 500,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
        });
    }

    return new Response(JSON.stringify(txt2imgResponseJson), {
        status: 200,
        headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
    });

}