'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/Loading"
import VideoList from '@/components/VideoList'
import ThemeMenu from '@/components/theme-menu'

 
import { Button } from "@/components/ui/button"


const CozeHeadlinePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [hasRAG, setHasRAG] = useState(true)
  const [videos, setVideos] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setHasRAG(true)
    setVideos([])

    try {
      const res = await axios.post('/api/coze/videos', { query })
      if (res.data.code === 201) {
        setHasRAG(false)
        setVideos([])
      } else {
        setHasRAG(true)
        setVideos(res.data.info)
        setIsOpen(false) // 自动关闭提问框
      }
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="container mx-auto py-10">
      

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className='flex justify-between aligan-items-center'>
            <Badge variant="secondary" className="mb-4 self-start">同上一堂课</Badge>
            <ThemeMenu />
          </div>

          <CardTitle className="text-2xl font-bold">
            小学重难点 视频课程智能推荐
          </CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length > 0 && !isOpen && (
            <Button className="w-full mb-4" onClick={() => setIsOpen(true)}>
              继续提问
            </Button>
          )}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleContent>
              <Textarea
                placeholder="输入困惑 ..."
                value={query}
                onChange={handleQueryChange}
                className="mb-4"
              />
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading} 
                className="w-full"
              >
                {isLoading ? '稍等，AI计算中...' : '给我推荐'}
              </Button>
              {isLoading && <Loading />}
              {!hasRAG && !isLoading && (
                <p className="mt-4 text-sm text-yellow-600">
                  对不起，问题超出我的知识范围，没有找到相关视频。<br />
                  请再详细点询问，或问其他问题。
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
      
      {videos.length > 0 && (
        <div className="mt-8">
          <VideoList videos={videos} />
        </div>
      )}
    </div>
  )
}

export default CozeHeadlinePage