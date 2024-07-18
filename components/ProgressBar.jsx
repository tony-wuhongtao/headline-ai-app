'use client'
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress"

const ProgressBar = ({isLoading}) => {
    const [progress, setProgress] = useState(0);
    const [eta, setEta] = useState(0);

    useEffect(() => {
        let interval; // 显式地定义 interval 的类型

        if (isLoading) {
            const fetchProgress = async () => {
                try {
                    const response = await fetch('/api/sd/v1/progress');
                    const data = await response.json()
                    console.log('Progress:', data.result.progress)
                    setProgress(data.result.progress * 100)
                    //保留一位小数
                    setEta(data.result.eta_relative.toFixed(1))
                }catch(error){
                    console.error('Error fetching progress:', error);
                }
            }  
            interval = setInterval(fetchProgress, 500)
        }
        return () => clearInterval(interval)    
        }, [isLoading])


    return (
        <div className="mb-4 flex justify-center w-1/2 mx-auto">
            {isLoading && (
            <div className="w-full">
                <Progress value={progress}/>
                <p>预估等待：{eta} 秒</p>
            </div>
            )}
        </div>
    )
}

export default ProgressBar;