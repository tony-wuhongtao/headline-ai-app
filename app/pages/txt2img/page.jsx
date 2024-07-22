'use client'

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Loading from '@/components/Loading';
import ProgressBar from '@/components/ProgressBar';
import axios from 'axios';
import {downloadBase64Image} from "@/app/utils/file";

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

import ThemeMenu from "@/components/theme-menu"

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
  const [isCustomized, setIsCustomized] = useState(false)

  const [style, setStyle] = useState("AWPainting_v1.3")

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

  function handleStyle(style) {
    setStyle(style);
    modelStyle.forEach(item => {
      if(item.modelName == style) {
        document.getElementById("cnprompt").value = item.promptCn;
        setEnprompt(item.prompt);
      }
    })
  }

  function handleCustomized(isCustomized) {
    setIsCustomized(isCustomized);
    document.getElementById("cnprompt").value = "";
    setEnprompt("");
  }

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

    formData.set('modelname', style);

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
        params.modelname = formData.get('modelname')
        if (!isCustomized && modelStyle[i].prompt !== undefined) {
          //预设提示词
          params.prompt = String(modelStyle[i].prompt)
          // params.prompt = prompt + formData.get('enprompt') + String(modelStyle[i].postPrompt)
        }
        else{
          //自定义提示词
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row h-screen">
      
        <div className="bg-background p-6 md:w-1/2">
          <header className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold">文生图 Text2Image</h1>
            <ThemeMenu />
          </header>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                value={isCustomized}
                onCheckedChange={(v) => handleCustomized(v, isCustomized)}
                id="customized-mode" />
              <Label htmlFor="airplane-mode">自定义提示词</Label>
            </div>
            <div>
              <Label>提示词：</Label>
              <Textarea
                id="cnprompt"
                rows={3}
                className="mt-2"
                placeholder="输入想要绘制的场景描述"
                name='cnprompt'
                disabled={!isCustomized}
              />
            </div>
            <div>
              <Textarea
                id="prompt"
                rows={3}
                className="mt-2"
                placeholder="英文翻译描述"
                name='enprompt'
                value={enprompt}
                disabled
                // style={{display:"none"}}
              />
            </div>

            <div>
              <Label>选择绘画风格</Label>
              {/* <ModelStyleSelector options={modelStyle} /> */}
              <RadioGroup value={style} onValueChange={(v) => handleStyle(v, style)}  className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                {modelStyle.map((option, index) => (
                  <Card key={index}>
                    <CardContent className="p-0">
                    <RadioGroupItem
                      value={option.modelName}
                      id={`style${index}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`style${index}`}
                      className="block cursor-pointer rounded-md border-2 border-muted p-4 hover:border-muted-foreground peer-data-[state=checked]:border-primary"
                    >
                        <img
                          src={option.imageUrl}
                          alt={`Style ${index}`}
                          className="w-full h-auto object-cover rounded"
                          ratio={1}
                        />
                        <span className="block mt-4 text-sm font-medium text-center">
                          {option.modelName}
                        </span>
                      </Label>
                    </CardContent>
                  </Card>
                ))}
              </RadioGroup>
            </div>

            
          </div>

        </div>

        <div className="bg-muted flex-1 flex flex-col text-center items-center justify-center p-6 md:border-l mt-6">
          <div className="space-y-2 w-2/3 mb-4">
            <Button
              className="w-full max-w-md" 
              type="submit"
              disabled={isButtonDisabled}
            >
              {isLoading ? '稍等，AI计算中...' : '生成图像'}
            </Button>
          </div>
          {isLoading ? (
            // <Spinner /> // 显示加载动画
            <Loading /> // 显示加载动画
          ) : imgCode ? (
            <>
              <div className="space-y-2">
                <div>
                  <img src={`data:image/png;base64,${imgCode}`} width="512" alt="生成的图像" className='rounded-lg shadow-lg w-full'/>
                </div>
                <div className='p-6'>
                  <Button className="w-2/3" onClick={handleDownload}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      下载图片
                  </Button>
                </div>
              </div>
            </>
          ) : null}
          {!isPending ? (<ProgressBar isLoading={isLoading}/>):null}
          {isPending && isLoading ? (
            <div className='mb-4 flex justify-center text-base'>任务排队中</div>
          ) : null}
          
        </div>
      
      </div>
    </form>
  );
};