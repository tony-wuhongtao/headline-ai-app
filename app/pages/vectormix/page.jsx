'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Loading from "@/components/Loading"
import VideoListforVectorMix from '@/components/VideoListforVectorMix'

const CozeHeadlinePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [query, setQuery] = useState('')
  const [hasRAG, setHasRAG] = useState(true)
  const [videos, setVideos] = useState([])
  const [display, setDisplay] = useState(false)

  const handleQueryChange = (e) => {
    setQuery(e.target.value)
  }

  const apiUrl = "http://103.213.161.39:8000/mix/aisearch"

  const queryObj = {
    "db_key": "znd_v2",
    "top_k": 4,
    "vector_weight": 0.2,
    "keyword_weight": 0.8,
    "keyword_fields": [
      "video_name",
      "video_sub",
      "video_keywords",
      "video_knowledgePoints"
    ]
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setIsButtonDisabled(true)
    setHasRAG(true)
    setVideos([])

    try {
      const res = await axios.post(apiUrl, { ...queryObj, query })
      if (res.data.code === 201) {
        setHasRAG(false)
        setVideos([])
        setDisplay(false)
      } else {
        const videoArray = res.data.results
          .map(result => ({
            ...result,
            teacher: result.teacher.replace(/_+/g, ' ')
          }))
          .filter(result => result.score.keyword > 0)

        if (videoArray.length > 0) {
          setHasRAG(true)
          setVideos(videoArray)
          setDisplay(true)
        } else {
          setIsLoading(true)
          setHasRAG(false)
          setDisplay(false)
        }
      }
    } catch (err) {
      console.log('err', err)
    } finally {
      setIsLoading(false)
      setIsButtonDisabled(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <Badge variant="secondary" className="mb-4 w-fit">同上一堂课</Badge>
          <CardTitle className="text-2xl font-bold">小学重难点 视频课程智能推荐</CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible open={!display}>
            <CollapsibleTrigger asChild>
              <Button 
                className={`w-full ${display ? '' : 'hidden'}`}
                onClick={() => setDisplay(false)}
              >
                继续提问
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4">
              <Textarea
                placeholder="输入困惑 ..."
                value={query}
                onChange={handleQueryChange}
                className="min-h-[100px]"
              />
              <Button 
                className="w-full"
                disabled={isButtonDisabled}
                onClick={handleSubmit}
              >
                {isLoading ? '稍等，AI计算中...' : '给我推荐'}
              </Button>
              {isLoading ? (
                <Loading />
              ) : !hasRAG && (
                <p className="text-yellow-600">
                  对不起，问题超出我的知识范围，没有找到相关视频。<br />
                  请再详细点询问，或问其他问题。
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {videos.length > 0 && <VideoListforVectorMix videos={videos} />}
    </div>
  )
}

export default CozeHeadlinePage