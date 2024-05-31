import React from 'react'
import SingleCardRes from './SingleCardRes'

const ModelCardRes = ({model}) => {
    console.log("model res", model);
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
            model.map((item)=>(
                <SingleCardRes key={item[0]._id} model={item}/>
            ))
        }
    </div>
  )
}

export default ModelCardRes