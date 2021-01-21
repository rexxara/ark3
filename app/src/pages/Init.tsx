import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'dva'
import { AnyAction } from 'redux'
interface Iprops {
    dispatch: (a: AnyAction) => AnyAction
    historyObj: any
}
const Init = (props: Iprops) => {
    useEffect(() => {
        props.dispatch({
            type: 'global/getSetting'
        })
        props.dispatch({
            type: 'history/setHistory',
            payload: props.historyObj
        })
    }, [])
    return <div></div>
}
export default connect((store: any) => store)(Init)