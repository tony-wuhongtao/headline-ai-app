'use client'
import React, { useEffect, useRef } from 'react'
import axios from 'axios';
import Loading from "@/components/Loading"
import VideoList from '@/components/VideoList';



const CozeHeadlinePage = () => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [hasRAG, setHasRAG] = React.useState(true)
  const [videos, setVideos] = React.useState([])

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }


  const handleSubmit = async () => {
    setIsLoading(true)
    setIsButtonDisabled(true)
    setHasRAG(true)
    setVideos([])

    axios.post('/api/coze/videos', { query }).then((res) => {
      if(res.data.code == 201){
        setHasRAG(false)
        setVideos([])
      }else{

        // console.log('res', res.data)
        setHasRAG(true)
        setVideos(res.data.info)
     
      }
      
    }).catch((err) => {
      console.log('err', err)
    }).finally(() => {

      setIsLoading(false)
      setIsButtonDisabled(false)
    })

    
  }

  return (
    <>
    <div className="flex justify-center items-center">      
        <div className="w-2/3 p-8 rounded-lg shadow-lg">
        <div><h1 className='font-bold text-4xl text-center m-8'>同上一堂课 小学 四五六年级 语数英重难点 <br />视频课程 智能推荐</h1></div>
            <div className="mb-4">
            <textarea
                className="textarea textarea-bordered w-full h-24 text-xl"
                placeholder="输入困惑 ..."
                value={query}
                name="query"
                onChange={handleQueryChange}
            />
            </div>


            <div className="mb-4 flex justify-center">
            <button
                className="btn w-full text-2xl text-pretty btn-primary"
                disabled={isButtonDisabled}
                onClick={handleSubmit}
            >
                {isLoading ? '稍等，AI计算中...' : '给我推荐'}
            </button>
            </div>
            <div className="flex justify-center">
            {isLoading ? (
                <Loading /> // 显示加载动画
            ) : hasRAG ? null:(<div className="w-full text-xl text-yellow-600">对不起，问题超出我的知识范围，没有找到相关视频。<br />请再详细点询问，或问其他问题。</div>)}
            </div>
        </div>

    </div>
    <div className="divider"></div>

    {videos.length > 0 ? (<VideoList videos={videos}/>)  
    :null}
    </>

  )
}

export default CozeHeadlinePage