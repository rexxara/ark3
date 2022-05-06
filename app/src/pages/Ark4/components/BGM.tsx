import React, { useCallback, useEffect, useRef } from 'react'
interface IProps {
    vol: number;
    src: string;
    bgmName: string;
}
export default function BGM(props: IProps) {
    const { src, vol, bgmName } = props
    const arkBgm = useRef(null);
    useEffect(() => {
        setVol()
    }, [vol, src])
    const setVol = useCallback(() => {
        const node = arkBgm.current as any
        if (node) { node.volume = vol / 100 }
    }, [vol, src])
    if (src.length < 1) {
        return <div></div>
    }
    return <div style={{ display: 'none' }}>
        <p>{bgmName}</p>
        <audio id="ARKBGM"
            ref={arkBgm}
            loop
            src={src}
            autoPlay
            controls></audio>
    </div>
}