import React, { useState, useEffect } from 'react'
import RawScript from '../scripts/index'
import  './index.css'
import { connect } from 'dva'
import { AnyAction } from 'redux'
import { ScencesPage } from '../utils/types'
import actions from '../components/Game/actions'
import Abutton from '../components/Abutton'
import { vw, vh } from '../utils/getSize'
import {  decode } from 'qss'
import BackBtn from '../components/BackBtn'
interface Iprops {
    dispatch: (a: AnyAction) => AnyAction
    history: {
        goBack: Function
        replace: Function
    }
    location: {
        search:string
    }
}
type SearchObj={
    page?:number
}
const ScenceReview = (props: Iprops) => {
    const searchObj:SearchObj=decode((props.location.search).substring(1))
    const scences = RawScript.scences as unknown as Array<ScencesPage>
    const page = searchObj.page||0
    const [caches, setCaches]: [Array<string>, any] = useState([])
    const [unLockKeys, setUnlockKeys] = useState<Array<string>>([])
    const currentPageScences = scences[page]
    const currentPageMap = Object.keys(currentPageScences).map(v => {
        const { script } = currentPageScences[v]
        let unlocked = 0
        script.map(v => {
            if (unLockKeys.includes(v.name)) {
                unlocked++
            }
        })
        return {
            name: v,
            unlocked: unlocked === script.length ? true : false,
            ...currentPageScences[v]
        }
    })
    useEffect(() => {
        const caches: Array<string> = []
        getUnlockData()
        scences.map(v => {
            Object.keys(v).map(vv => {
                caches.push(v[vv].cover)
            })
        })
        setCaches(caches)
    }, [])
    const clickHandle = (v: any) => {
        console.log(v)
        props.dispatch({
            type: 'global/reviewScence',
            payload: v
        })
    }
    const setPageHandle = (i: number) => {
        props.history.replace(`/ScenceReview/?page=${i}`)
    }
    const getUnlockData = async () => {
        const res = await actions.getScenceUnlockData()
        setUnlockKeys(res.map(v => v.id))
    }
    return <div style={{ position: 'absolute', top: 0, left: 0, width: vw(100) }}>
        <div className='cardCon' style={{ height: vw(40) }}>
            {currentPageMap.map((v) => {
                return v.unlocked ? <div
                    onClick={() => clickHandle(v)}
                    key={v.name}
                    style={{
                        background: `url(${require(`../scripts/CGs/${v.cover}`)})`,
                        width: vw(27.5),
                        height: vw(15.5)
                    }}
                    className='galleryCard'>{v.name}</div> : <div
                        key={v.name} className='galleryCard'>
                            {v.name}
                        </div>
            })}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {scences.map((v, i) => <Abutton key={i}
                onClick={() => { setPageHandle(i) }}>{i + 1}</Abutton>)}
            <BackBtn/>
        </div>
        <div style={{ opacity: 0 }}>
            {caches.map(v => <img style={{ position: "absolute", top: 0, left: 0, width: '8vw' }} key={v} src={require(`../scripts/CGs/${v}`)} />)}
        </div>
    </div>
}

export default connect((store: any) => store)(ScenceReview)