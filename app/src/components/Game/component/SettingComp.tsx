import * as React from 'react'
import { connect } from 'dva'
import { globalState } from '../../../models/global'
import VolControllor from './VolControllor'
import { AnyAction } from 'redux'
import { vw, vh } from '../../../utils/getSize'
interface IProps {
    global: globalState
    dispatch: (a: AnyAction) => AnyAction
}
const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}
const conStyle = {
    padding: `${vh(5)} ${vw(5)}`
}
const SettingItem = (props: IProps) => {
    const { global: { setting: { bgmVol, seVol } } } = props
    return <div style={conStyle}>
        <div style={style}>
            <VolControllor setting={props.global.setting} dispatch={props.dispatch} typeKey='bgmVol' title="BGM音量" value={bgmVol} />
            <VolControllor setting={props.global.setting} dispatch={props.dispatch} typeKey='seVol' title="音效音量" value={seVol} />
        </div>
    </div>
}
export default connect((store: any) => store)(SettingItem)