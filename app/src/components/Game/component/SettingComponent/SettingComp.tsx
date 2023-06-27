import * as React from 'react'
import { connect } from 'dva'
import VolControllor from '../../VolControl/VolControllor'
import { AnyAction } from 'redux'
import { AUDIO_AMOUNT_INIT_SETTING } from '../../actions'
import style from './style.module.css';
interface IProps {
    audio: typeof AUDIO_AMOUNT_INIT_SETTING
    dispatch: (a: AnyAction) => AnyAction
}
const SettingItem = (props: IProps) => {
    const { audio: { bgmVol, seVol, chVol } } = props
    return <div className={style.conStyle}>
        <div className={style.left}>
            <VolControllor setting={props.audio} dispatch={props.dispatch} typeKey='bgmVol' title="BGM音量" value={bgmVol} />
            <VolControllor setting={props.audio} dispatch={props.dispatch} typeKey='seVol' title="音效音量" value={seVol} />
            <VolControllor setting={props.audio} dispatch={props.dispatch} typeKey='chVol' title="语音音量" value={chVol} />
        </div>
        <div className={style.right}></div>
    </div>
}
export default connect((store: any) => store)(SettingItem)