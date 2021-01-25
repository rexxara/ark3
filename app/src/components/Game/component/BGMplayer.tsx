import React, { useCallback, useEffect,useRef } from 'react'
import { selectedBGM } from '../../../utils/types'
import { AudioBlob } from './ImgCache'
interface IProps {
    src: selectedBGM,
    cache: AudioBlob[],
    vol:number
}
export default function (props: IProps) {
    console.log(props)
    const { src: { name, src }, cache } = props
    const arkBgm = useRef(null);
    useEffect(()=>{
        setVol()
    },[props.vol,props.src])
    const setVol=useCallback(()=>{
        const node=arkBgm.current as any
        if(node){node.volume=props.vol/100}
    },[props.vol,props.src])
    if (src.length < 1) {
        return <div></div>
    }
    const findedCache = cache.find(v => v.src === src)
    return <div style={{ display: 'none' }}>
        <p>{name}</p>
        <audio id="ARKBGM" 
        ref={arkBgm}
        loop
        src={findedCache?findedCache.blob:require(`../../../scripts/BGM/${src}`)}
        autoPlay
        controls></audio>
    </div>
}