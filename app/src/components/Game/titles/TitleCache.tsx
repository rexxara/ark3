import React from 'react'
import { imgMap } from './index'
import '../style.css'
export default function () {
    return <div >
        {Object.keys(imgMap).map(v => {
            return <img className="cacheImg" key={v} src={imgMap[v]} alt="" />
        })}
    </div>
}