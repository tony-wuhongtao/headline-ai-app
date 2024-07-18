    import React from 'react';
    import Image from 'next/image';
    
    
    const ModelStyleSelector = ({options}) => {
        return (
            <div className='flex justify-center w-full px-1 flex-wrap'>
                {options.map((option, index) => (
                    <div key={index}  htmlFor={`model-${index}`}>
                        <label>
                            <div className="flex flex-col justify-center w-24 rounded mx-1 pb-2">
                                <img src={option.imageUrl} />
                                <input type="radio" name="modelname" className="mt-2 m-auto radio radio-primary radio-xs" value={option.modelName}/>
                            </div>    
                        </label>
                    </div>
                ))}
                
            </div>
        );
    }
    
    export default ModelStyleSelector;