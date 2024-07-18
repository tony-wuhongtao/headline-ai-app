'use client'

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/Loading';
import ProgressBar from '@/components/ProgressBar';
import ModelStyleSelector from '@/components/ModelStyleSelector';
import axios from 'axios';
import {downloadBase64Image} from "@/app/utils/file";

// type ModelStyle = {
//   modelName: string;
//   imageUrl: string;
//   prePrompt?: string;
//   postPrompt?: string;
//   negative?: string;
//   samplerIndex?: string;
//   steps?: number;
// }

export default function SD() {
  const [enprompt, setEnprompt] = useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [imgCode, setImgCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isPending, setIsPending] = useState(true)
  const [modelStyle, setModelStyle] = useState([]);

  let taskId = "";

  let formData;

  let params = {}

  //获取本地json文件，展示model风格选项，useState当值变化时更新
  useEffect( () => {
    try {
      axios.get('/select_models.json').then((res)=>{
        const opt = res.data.models;
        setModelStyle(opt)
    });
    } catch (error) {
      console.log(error);
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault() // 防止表单提交导致页面刷新
  
    taskId = uuidv4()
  
    setImgCode('')
    setIsButtonDisabled(true) // 禁用按钮
    setIsLoading(true) // 显示加载状态
    setIsPending(true) // 排队状态

    formData = new FormData(event.currentTarget)
    const cnprompt = formData.get('cnprompt')
    let enprompt = formData.get('enprompt')

    // console.log(formData.get('modelname'))
 
    // const selectedModel = formData.get('modelname')
    // console.log(selectedModel)

    if(cnprompt != '') { //输入了中文，调用翻译api
      try {
        const res = await fetch('/api/ai/v1/cn2en', {
          method: 'POST',
          body: JSON.stringify({ cnTxt: cnprompt }),
        })
        const data = await res.text()

        enprompt = data
        setEnprompt(data)
        // 更新 formData，将 enprompt 添加到其中
        formData.set('enprompt', enprompt);
        // Update input field with new value

        

      } catch (error) {
        console.error('Error:', error)
      } finally {
  
      }
    
    }

    axios.post('/api/sd/v1/txt2img-task',{ taskId }).then((res)=>{
      if(res.data.message == 'success'){
        console.log(res.data)
        //任务放入队列完成     
        queryTaskStatus()   
       }
      }
    ).catch((err)=>{
      console.log(err)
    })

    // append formdata with model parameters
    for (let i = 0; i < modelStyle.length; i++){
      if(modelStyle[i].modelName == formData.get('modelname')){
        let prompt = ""
        params.modelname = formData.get('modelname')
        if (modelStyle[i].prePrompt !== undefined && modelStyle[i].postPrompt !== undefined) {
          prompt = String(modelStyle[i].prePrompt)
          params.prompt = prompt + formData.get('enprompt') + String(modelStyle[i].postPrompt)
        }
        else{
          params.prompt = formData.get('enprompt')
        }

        if (modelStyle[i].negative !== undefined) {
          params.negative = modelStyle[i].negative
        }
        if (modelStyle[i].samplerIndex !== undefined) {
          params.samplerindex = String(modelStyle[i].samplerIndex)
        }
        if (modelStyle[i].steps !== undefined) {
          params.steps = String(modelStyle[i].steps)
        }
        break;
      }
    }
  }


  const queryTaskStatus = async () => {
    try {
      const res = await axios.get(`/api/sd/v1/txt2img-task?taskId=${taskId}`);
      // console.log(taskId)
      // console.log(res.data)
      if (res.data.message === 'success') {
        if (res.data.status === 'processing') {
          setIsPending(false)

          const body = {
            prompt : params.prompt,
            negative_prompt: params.negative,
            steps: parseInt(params.steps),
            sampler_index: params.samplerindex,
            override_settings:{
                sd_model_checkpoint: params.modelname
            }
          }

          axios.post('/api/sd/v1/txt2img',body).then((res)=>{      
          // console.log(body)
          // console.log(res.data)
          setImgCode(res.data.result) // 更新 imgCode 状态
          setIsLoading(false) // 隐藏加载状态
          setIsButtonDisabled(false) // 启用按钮
          axios.get('/api/sd/v1/txt2img-task',{ params: { taskId, status:'completed' } }).then((res)=>{
            // console.log(res.data)
            if(res.data.message == 'success'){
              // console.log('任务完成')
              setIsPending(true)
            }else{
              // console.log('任务失败')
            }
          })
        })
          
        } else if (res.data.status === 'pending') {
          // 任务排队中，等待处理
          setTimeout(() => queryTaskStatus(), 1000); // 每隔1秒钟查询一次
        }else {
        console.log('获取任务状态失败');
        }
      }
      
    } catch (error) {
      console.log(error);
    }

  }

  const handleDownload = async (event) => {
    event.preventDefault() // 防止表单提交导致页面刷新
    console.log(imgCode)
    if (imgCode) {
      downloadBase64Image(imgCode, "image.png");
    }
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 w-full"> 
      <form onSubmit={handleSubmit} className="p-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:pr-10 rounded-lg shadow-lg p-8">
          <h5 className="mb-4 text-4xl font-extrabold leading-none">文生图 Txt2Image</h5>
          <h6 className="mb-4 text-sm leading-none">中文输入想要绘制的角色，选择场景，点击生成图像，等待AI绘画</h6>
          <div className="mb-4">
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="想要绘制什么角色？（如：猫、狗、机器人...）"
              name='cnprompt'
            />
          </div>
          <div className="mb-4" style={{display:'none'}}>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="输入图片的英文描述..."
              name='enprompt'
              value={enprompt}
              disabled
            />
          </div>
          <div className="mb-4 flex justify-center">
            <ModelStyleSelector options={modelStyle} />
          </div>

          <div className="flex items-center space-x-4">
            <div className="mb-4 flex justify-center w-full">
              <button
                className="btn w-full text-2xl text-pretty btn-primary"
                type="submit"
                disabled={isButtonDisabled}
              >
                {isLoading ? '稍等，AI计算中...' : '生成图像'}
              </button>
            </div>
            </div>
        </div>

        <div>
          <div className="flex justify-center h-full flex-col">
            {isLoading ? (
              // <Spinner /> // 显示加载动画
              <Loading /> // 显示加载动画
            ) : imgCode ? (
              <div className="flex justify-center relative">
                <img src={`data:image/png;base64,${imgCode}`} width="512" alt="生成的图像" className='rounded-lg shadow-lg'/>
                <div className='absolute bottom-3 text-base'>
                  <button className="btn glass text-primary" onClick={handleDownload}>
                    <svg t="1717653630476" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15841" width="28" height="28"><path d="M802 664v146c0 7.7-6.3 14-14 14H236c-7.7 0-14-6.3-14-14V664c0-5.5-4.5-10-10-10h-50c-5.5 0-10 4.5-10 10v170c0 33.1 26.9 60 60 60h600c33.1 0 60-26.9 60-60V664c0-5.5-4.5-10-10-10h-50c-5.5 0-10 4.5-10 10z" p-id="15842" fill="#5218fa"></path><path d="M547 163v449.5l173.6-173.6c13.7-13.7 35.8-13.7 49.5 0 13.7 13.7 13.7 35.8 0 49.5L536.8 721.7c-0.4 0.4-0.8 0.8-1.3 1.2-0.2 0.2-0.4 0.4-0.6 0.5-0.2 0.2-0.4 0.4-0.7 0.6-0.3 0.2-0.5 0.4-0.8 0.6-0.2 0.1-0.4 0.3-0.5 0.4l-0.9 0.6c-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.4-1 0.6-0.2 0.1-0.3 0.2-0.5 0.3-0.3 0.2-0.6 0.4-1 0.5-0.2 0.1-0.4 0.2-0.5 0.3-0.3 0.2-0.6 0.3-0.9 0.5l-0.6 0.3c-0.3 0.1-0.6 0.3-0.8 0.4-0.2 0.1-0.5 0.2-0.7 0.3-0.3 0.1-0.5 0.2-0.8 0.3l-0.9 0.3c-0.2 0.1-0.4 0.2-0.7 0.2-0.3 0.1-0.6 0.2-1 0.3-0.2 0.1-0.4 0.1-0.6 0.2-0.4 0.1-0.7 0.2-1.1 0.3-0.2 0-0.4 0.1-0.6 0.1-0.4 0.1-0.7 0.2-1.1 0.2-0.2 0-0.4 0.1-0.6 0.1-0.4 0.1-0.7 0.1-1.1 0.2-0.2 0-0.4 0.1-0.7 0.1-0.3 0-0.7 0.1-1 0.1-0.3 0-0.6 0-0.9 0.1-0.3 0-0.5 0-0.8 0.1-1.2 0.1-2.3 0.1-3.5 0-0.3 0-0.5 0-0.8-0.1-0.3 0-0.6 0-0.9-0.1-0.3 0-0.7-0.1-1-0.1-0.2 0-0.4-0.1-0.7-0.1-0.4-0.1-0.7-0.1-1.1-0.2-0.2 0-0.4-0.1-0.6-0.1-0.4-0.1-0.7-0.2-1.1-0.2-0.2 0-0.4-0.1-0.6-0.1-0.4-0.1-0.7-0.2-1.1-0.3-0.2-0.1-0.4-0.1-0.6-0.2-0.3-0.1-0.6-0.2-1-0.3-0.2-0.1-0.5-0.1-0.7-0.2l-0.9-0.3c-0.3-0.1-0.5-0.2-0.8-0.3-0.2-0.1-0.5-0.2-0.7-0.3-0.3-0.1-0.6-0.3-0.8-0.4l-0.6-0.3c-0.3-0.2-0.6-0.3-0.9-0.5-0.2-0.1-0.4-0.2-0.5-0.3-0.3-0.2-0.6-0.4-1-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.4-1-0.6-0.2-0.1-0.3-0.2-0.5-0.3-0.3-0.2-0.6-0.4-0.9-0.7-0.2-0.1-0.3-0.3-0.5-0.4-0.3-0.2-0.5-0.4-0.8-0.6-0.2-0.2-0.4-0.4-0.7-0.6-0.2-0.2-0.4-0.4-0.6-0.5l-1.2-1.2-233.1-233.1c-13.7-13.7-13.7-35.8 0-49.5 13.7-13.7 35.8-13.7 49.5 0L477 612.5V163c0-19.3 15.7-35 35-35s35 15.7 35 35z" p-id="15843" fill="#5218fa"></path></svg>
                      下载图片
                  </button>
                </div>
              </div>
            ) : null}
            {!isPending ? (<ProgressBar isLoading={isLoading}/>):null}
            {isPending && isLoading ? (
              <div className='mb-4 flex justify-center text-base'>任务排队中</div>
            ) : null}
          </div>
          
          
          </div>
        </div>
      </form>
    </div>
  );
};