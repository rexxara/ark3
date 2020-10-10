import React from 'react'
import SaveDataCon from '../components/Game/component/saveDataCon'
import './index.css'
import { connect } from 'dva'
import { AnyAction } from 'redux'
import { vw, vh } from '../utils/getSize'
import BackBtn from '../components/BackBtn'

interface Iprops {
    dispatch: (a: AnyAction) => AnyAction
}
const LoadPage = (props: Iprops) => {
    const load = (param: any, data: any) => {
        props.dispatch({
            type: 'global/load',
            payload: data
        })
    }
    return <div className='scence' style={{ width: vw(100), height: vh(100) }}>
        <div style={{ position: 'relative', overflowY: 'scroll', overflowX: 'hidden', width: vw(100), height: vh(80) }}>
            <SaveDataCon loadData={load} />
        </div>
        <div style={{ position: "absolute", bottom: 0 }}>
            <BackBtn></BackBtn>
        </div>
    </div>
}
export default connect((store: any) => store)(LoadPage)