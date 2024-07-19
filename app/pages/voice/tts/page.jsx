import React from 'react'
import { PageHeader } from '../_components/PageHeader'
import { VoiceTTSForm} from '../_components/VoiceTTSForm'

const VoiceTTSPage = () => {
  return (
    <>
    <div className='flex justify-between items-center gap-4'>
        <PageHeader>文字转语音</PageHeader>
    </div>
    <VoiceTTSForm />    
    </>

  )
}

export default VoiceTTSPage