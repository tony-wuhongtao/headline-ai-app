import { NextResponse } from "next/server";

const cozeApiUrl = "https://api.coze.cn/open_api/v2/chat";

export async function POST(req){

    const token = process.env.COZE_TOKEN
    const converstaion_id = process.env.COZE_CONVERSATION_ID
    const user = process.env.COZE_USER
    const bot_id = process.env.COZE_BOT_ID

    const data = await req.json()
    const query = data.query
    console.log(query)


    // const extractJsonFromText = (text) => {
    //     // 使用正则表达式来匹配JSON字符串
    //     const jsonRegex = /\{[\s\S]*?\}/;
    //     const jsonMatch = text.match(jsonRegex);
        
    //     if (jsonMatch) {
    //         // 尝试将匹配到的JSON字符串解析为对象
    //         try {
    //             const jsonObject = JSON.parse(jsonMatch[0]);
    //             return jsonObject;
    //         } catch (error) {
    //             console.error('无法解析JSON:', error);
    //         }
    //     }
        
    //     // 如果没有找到JSON或者解析失败，返回null
    //     return null;
    // }

    function extractVideosFromJsonText(text) {
        try {
            // 将JSON字符串解析为JavaScript对象数组
            const videoArray = JSON.parse(text);
            
            // 检查解析后的数据确实是一个数组
            if (Array.isArray(videoArray)) {
                // 返回解析后的视频对象数组
                return videoArray;
            } else {
                // throw new Error('解析后的数据不是一个数组');
                return null;
            }
        } catch (error) {
            console.error('解析JSON字符串时出错:', error);
            return null;
        }
    }


    function filterVideos(videoArray) {
        // 确保输入是有效的数组
        if (!Array.isArray(videoArray)) {
            throw new Error('Input must be an array');
        }
    
        // 使用数组的filter方法过滤掉不需要的对象
        const filteredVideos = videoArray.filter(video => {
            // 提取video_cover字段的值
            const coverUrl = video.video_cover_url;
    
            // 检查coverUrl是否包含'example.com'
            // 如果不包含，则返回true，表示保留这个对象
            // 如果包含，则返回false，表示过滤掉这个对象
            return !coverUrl.includes('example.com');
        });
    
        // 返回过滤后的数组
        return filteredVideos;
    }

    const body = {
        "conversation_id": converstaion_id,
        "bot_id": bot_id,
        "user": user,
        "query": query,
        "stream":false
    }

    const res = await fetch(cozeApiUrl, {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Host': 'api.coze.cn',
            'Connection': 'keep-alive',
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const res_json = await res.json()





    // console.log(res_json.messages[1].content)

    var res_objs = extractVideosFromJsonText(res_json.messages[1].content)

    // console.log(res_objs)

    if(res_objs == null){
        console.log("res_obj is null")
        
        return new NextResponse(JSON.stringify({
            "code": 201,
            "info": "对不起，你的困惑已超出我的智能知识库范围，无法推荐相关视频。"
        }))
    }

    var res_objs_filtered = filterVideos(res_objs)

    if(res_objs_filtered.length == 0){
        console.log("nothing real answer")
        
        return new NextResponse(JSON.stringify({
            "code": 201,
            "info": "对不起，你的困惑已超出我的智能知识库范围，无法推荐相关视频。"
        }))
    }

    console.log(res_objs_filtered)

    return new NextResponse(JSON.stringify({
        "code": 200,
        "info": res_objs_filtered
    }))


}