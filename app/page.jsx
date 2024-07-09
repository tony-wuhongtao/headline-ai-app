'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div 
          className="flex flex-col w-full mb-2 lg:justify-between lg:flex-row md:mb-4"
          
        >
          <div className="flex items-center group lg:max-w-xl">
            <a href="/" aria-label="Item" className="mr-3">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </a>
            <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
              <span className="inline-block mb-2">Headline AI Site</span>
              <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
            </h2>
          </div>
         
        </div>
      </div>

      <div className='flex flex-col sm:flex-row'>
        <Link href="/pages/vectormix" className='flex-1 w-full md:w-1/2 lg:w-1/3'>
          <div className="carousel carousel-center rounded-box m-6 hover:shadow-lg">
            <div className="carousel-item w-full flex justify-center items-center">
              <motion.div className="card-body absolute text-center"
                    initial={{ y: -120, scale: 3, rotate: 45, opacity: 0 }}
                    animate={{ y: 0, scale:1.5, rotate: 0, opacity: 1 }}
                    transition={{ ease: "linear",duration: 1}}>
                <h2 className="card-title text-white tracking-wider">小学重难点课程推荐</h2>
              </motion.div>
              <motion.img src="/ai-teacher.jpg" alt="ai-teacher" whileTap={{scale:1.5}} />
            </div> 
          </div>
        </Link>

        <Link href="/pages/txt2img" className='flex-1 w-full md:w-1/2 lg:w-1/3'>
          <div className="carousel carousel-center rounded-box m-6 hover:shadow-lg">
            <div className="carousel-item w-full flex justify-center items-center">
              <motion.div className="card-body absolute text-center"
                    initial={{ y: -120, scale: 3, rotate: -45, opacity: 0 }}
                    animate={{ y: 0, scale:2, rotate: 0, opacity: 1 }}
                    transition={{ ease: "linear",duration: 1}}>
                <h2 className="card-title text-white tracking-wider" >AI绘画</h2>
              </motion.div>
              <motion.img src="/ai-painting.jpg" alt="ai-painting" whileTap={{scale:1.5}}/>
            </div> 
          </div>
        </Link>

        <Link href="/pages/motionsvg" className='flex-1 w-full md:w-1/2 lg:w-1/3'>
          <div className="carousel carousel-center rounded-box m-6 hover:shadow-lg">
            <div className="carousel-item w-full flex justify-center items-center">
              <motion.div className="card-body absolute text-center"
                    initial={{ y: 120, scale: 3, rotate: 90, opacity: 0 }}
                    animate={{ y: 0, scale:2, rotate: 0, opacity: 1 }}
                    transition={{ ease: "linear",duration: 1}}>
                <h2 className="card-title text-white tracking-wider" >炫酷入口</h2>
              </motion.div>
              <motion.img src="/ai-painting.jpg" alt="ai-painting" whileTap={{scale:1.5}}/>
            </div> 
          </div>
        </Link>

        <Link href="/pages/shadcnuidemo" className='flex-1 w-full md:w-1/2 lg:w-1/3'>
          <div className="carousel carousel-center rounded-box m-6 hover:shadow-lg">
            <div className="carousel-item w-full flex justify-center items-center">
              <motion.div className="card-body absolute text-center"
                    initial={{ y: -120, scale: 3, rotate: -90, opacity: 0 }}
                    animate={{ y: 0, scale:1.3, rotate: 0, opacity: 1 }}
                    transition={{ ease: "linear",duration: 1}}>
                <h2 className="card-title text-white tracking-wider" >shadcnUI Demo</h2>
              </motion.div>
              <motion.img src="/ai-painting.jpg" alt="ai-painting" whileTap={{scale:1.5}}/>
            </div> 
          </div>
        </Link>

      </div>
    </>
  )
}

export default HomePage