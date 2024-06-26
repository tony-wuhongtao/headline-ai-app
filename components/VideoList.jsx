import { Player,BigPlayButton,ReplayControl,ForwardControl,ControlBar,LoadingSpinner  } from 'video-react';
import "video-react/dist/video-react.css"; 

const VideoList = ({videos}) => {
  return (
    <div className="flex-row">
    {
        // videos.map((video)=>(
        //     <div key={video.video_vid} className="card flex-1 w-full md:w-full lg:w-1/2 bg-base-100 shadow-xl m-4">
        //         <figure>
        //             <Player
        //                     startTime = {13}
        //                     preload="auto"
        //                     poster={video.video_cover_url}
        //                     src={video.video_url}
        //                 >
        //             <BigPlayButton position="center" />
        //             <LoadingSpinner />
        //             <ControlBar autoHide={true}>
        //                 <ReplayControl seconds={10} order={2.1} />
        //                 <ForwardControl seconds={10} order={2.2} />
        //             </ControlBar>
        //             </Player>
        //         </figure>
        //         <div className="card-body">
        //             <h1 className="card-title text-base">{video.video_name}</h1>
        //             <h2 className='card-title text-xs text-gray-500'>{video.video_teacher} - {video.video_school}</h2>
        //             <p className='text-sm'><b>推荐理由：</b>{video.video_why}</p>
        //             <div className="divider"></div>
        //             <p className='text-sm'><b>课程介绍：</b>{video.video_info}</p>
        //         </div>
        //     </div>

        // ))

        videos.map((video)=>(
            <div key={video.video_vid}  className="px-4 py-4 mb-6 mx-auto w-full md:px-8 lg:px-8 lg:py-8 rounded-xl shadow-lg">
                <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
                    <div>
                        <figure>
                            <Player
                                    startTime = {20}
                                    preload="auto"
                                    poster={video.video_cover_url}
                                    src={video.video_url}
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
                            <h2 className="max-w-lg mb-4 text-base font-bold tracking-tight text-gray-900 sm:leading-none">{video.video_name}</h2>
                            <h2 className='mb-4 card-title text-xs text-primary'>{video.video_teacher} - {video.video_school}</h2>
                            <p className="mb-4 text-xs text-gray-700"><b>推荐理由：</b>{video.video_why}</p>
                            <p className="text-xs text-gray-700"><b>课程介绍：</b>{video.video_info}</p>
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
