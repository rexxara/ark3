import * as React from 'react'
import { connect } from 'dva'
import VolControllor from './VolControllor'
import { AnyAction } from 'redux'
import { vw, vh } from '../../../utils/getSize'
import { INIT_SETTING } from '../actions'
interface IProps {
    audio: typeof INIT_SETTING
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
    const { audio: { bgmVol, seVol } } = props
    return <div style={conStyle}>
        <div style={style}>
            <VolControllor setting={props.audio} dispatch={props.dispatch} typeKey='bgmVol' title="BGM音量" value={bgmVol} />
            <VolControllor setting={props.audio} dispatch={props.dispatch} typeKey='seVol' title="音效音量" value={seVol} />
        </div>
    </div>
}
export default connect((store: any) => store)(SettingItem)