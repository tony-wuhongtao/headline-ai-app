import { Player,BigPlayButton,ReplayControl,ForwardControl,ControlBar,LoadingSpinner  } from 'video-react';
import "video-react/dist/video-react.css"; 

const VideoList = ({videos, startTime}) => {
  return (
    <div className="flex-row">
    {
        videos.map((video)=>(
            <div key={video.video_id}  className="px-4 py-4 mb-6 mx-auto w-full md:px-8 lg:px-8 lg:py-8 rounded-xl shadow-lg">
                <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
                    <div>
                        <figure>
                            <Player
                                    startTime = {startTime}
                                    preload="auto"
                                    poster={video.cover_link}
                                    src={video.link}
                                >
                            <BigPlayButton position="center" />
                            <LoadingSpinner />
                            <ControlBar autoHide={true}>
                                <ReplayControl seconds={10} order={2.1} />
                                <ForwardControl seconds={10} order={2.2} />
                            </ControlBar>
                            </Player>
                        </figure>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="max-w-xl mb-6">
                            <h2 className="max-w-lg mb-4 text-base font-bold tracking-tight text-gray-900 sm:leading-none">{video.name}</h2>
                            <h2 className='mb-4 card-title text-xs text-primary'>{video.teacher}</h2>
                            <p className="mb-4 text-xs text-gray-700"><b>知识点：</b>
                                { video.keywords.split(/\s+/).map(item => <span key={item.index} class="inline-flex items-center rounded-md bg-purple-50 px-1 py-1 mr-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">{item}</span>) }
                            </p>
                            <p className="text-xs text-gray-700"><b>课程介绍：</b>{video.summary}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        ))
    }
    </div>
  )
}

export default VideoList
