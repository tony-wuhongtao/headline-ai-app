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

      <main className="container mx-auto py-2 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div className="group relative overflow-hidden rounded-lg shadow-lg" whileTap={{scale:1.2}}>
            <Link href="/pages/vectormix" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only"></span>
            </Link>
            <motion.img
              src="/ai-teacher.jpg"
              alt="Project 1"
              width={600}
              height={330}
              className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <motion.div className="p-4"
              initial={{ y: 120, scale: 1.2, rotate: -45, opacity: 0 }}
              animate={{ y: 0, scale:1, rotate: 0, opacity: 1 }}
              transition={{ ease: "linear",duration: 1}}>
              <h3 className="text-xl font-semibold">小学重难点课程推荐</h3>
            </motion.div>
          </motion.div>

          <motion.div className="group relative overflow-hidden rounded-lg shadow-lg" whileTap={{scale:1.2}}>
            <Link href="/pages/txt2img" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only"></span>
            </Link>
            <motion.img
              src="/ai-painting.jpg"
              alt="Project 2"
              width={600}
              height={330}
              className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <motion.div className="p-4"
              initial={{ y: -120, scale: 1.2, rotate: 45, opacity: 0 }}
              animate={{ y: 0, scale:1, rotate: 0, opacity: 1 }}
              transition={{ ease: "linear",duration: 1}}>
              <h3 className="text-xl font-semibold">AI绘画</h3>
            </motion.div>
          </motion.div>

          <motion.div className="group relative overflow-hidden rounded-lg shadow-lg" whileTap={{scale:1.2}}>
            <Link href="/pages/motionsvg" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only"></span>
            </Link>
            <motion.img
              src="/ai-painting.jpg"
              alt="Project 3"
              width={600}
              height={330}
              className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <motion.div className="p-4"
              initial={{ y: 120, scale: 1.2, rotate: -45, opacity: 0 }}
              animate={{ y: 0, scale:1, rotate: 0, opacity: 1 }}
              transition={{ ease: "linear",duration: 1}}>
              <h3 className="text-xl font-semibold">炫酷入口</h3>
            </motion.div>
          </motion.div>

          <motion.div className="group relative overflow-hidden rounded-lg shadow-lg" whileTap={{scale:1.2}}>
            <Link href="/pages/shadcnuidemo" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View Project</span>
            </Link>
            <motion.img
              src="/ai-painting.jpg"
              alt="Project 4"
              width={600}
              height={330}
              className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <motion.div className="p-4"
              initial={{ y: -120, scale: 1.2, rotate: 45, opacity: 0 }}
              animate={{ y: 0, scale:1, rotate: 0, opacity: 1 }}
              transition={{ ease: "linear",duration: 1}}>
              <h3 className="text-xl font-semibold">shadcnUI Demo</h3>
            </motion.div>
          </motion.div>
        </div>
      </main>

    </>
  )
}

export default HomePage