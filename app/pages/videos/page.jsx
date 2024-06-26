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
  const [display, setDisplay] = React.useState(false);

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
        setDisplay(false)
      }else{

        // console.log('res', res.data)
        setHasRAG(true)
        setVideos(res.data.info)
        setDisplay(true)
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
      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-16 lg:px-8 lg:py-16">
        <div className="mx-auto sm:text-center lg:max-w-2xl">
          <div className="max-w-xl mb-6 md:mx-auto sm:text-center lg:max-w-2xl md:mb-8">
            <div>
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full badge badge-accent">
              同上一堂课
              </p>
            </div>
            <h2 className="max-w-lg mb-4 px-3  font-sans font-bold leading-none tracking-tight text-gray-900  text-lg md:text-xl lg:text-2xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#5dc90b42-5ed4-45a6-8e63-2d78ca9d3d95)"
                    width="52"
                    height="24"
                  />
                </svg>
                小学重难点 视频课程智能推荐</span>
            </h2>
            {/* <p className="text-base text-gray-700 md:text-lg">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque rem aperiam, eaque ipsa quae.
            </p> */}
          </div>
          <div tabIndex="0" className={ display ? 'collapse collapse-close' : 'collapse collapse-open'} >
          <input type="radio" className='hidden'/>
            <div className={display ? 'collapse-title px-3 text-sm font-medium' : 'collapse-title px-3 text-sm font-medium hidden'}>
              <button
                className="btn w-full md:w-3/4 lg:w-1/2 text-xs md:text-xs lg:text-sm text-pretty btn-primary"
                onClick={() => setDisplay((display) => !display)}
              >
                继续提问
              </button></div>

            <div className="collapse-content h-auto w-full md:w-4/5 lg:w-2/3 p-4 m-auto rounded-lg">
                <div className="mb-4">
                <textarea
                    className="textarea textarea-bordered w-full h-24 text-xs md:text-xs lg:text-sm"
                    placeholder="输入困惑 ..."
                    value={query}
                    name="query"
                    onChange={handleQueryChange}
                />
                </div>


                <div className="mb-4 flex justify-center">
                <button
                    className="btn w-full md:w-3/4 lg:w-1/2 text-xs md:text-xs lg:text-sm text-pretty btn-primary"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                >
                    {isLoading ? '稍等，AI计算中...' : '给我推荐'}
                </button>
                </div>
                <div className="flex justify-center">
                {isLoading ? (
                    <Loading /> // 显示加载动画
                ) : hasRAG ? null:(<div className="w-full text-sm text-yellow-600">对不起，问题超出我的知识范围，没有找到相关视频。<br />请再详细点询问，或问其他问题。</div>)}
                </div>
            </div>
          </div>

          {/* </div> */}
          <div className="divider"></div>

        </div>
        <div className="flex w-full">

          {videos.length > 0 ? (<VideoList videos={videos}/>)  
          :null}
        
        
        </div>
      </div>
    </>

  )
}

export default CozeHeadlinePage