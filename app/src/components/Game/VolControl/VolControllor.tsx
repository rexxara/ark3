import * as React from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AudioAmountSetting } from '../actions'

import style from './style.module.css';
import Abutton from '../../Abutton';
import IProgressBar from '../component/IProgressBar';
import CommonStyle from '../component/CommonStyle';
import classNames from 'classnames';

interface IProps {
    value: number,
    title: string,
    dispatch: Function,
    typeKey: string,
    setting: AudioAmountSetting
}
const VolControllor = (props: IProps) => {
    const { value, title, typeKey } = props
    const increase = () => {
        let percent = value + 10;
        if (percent > 100) {
            percent = 100;
        }
        props.dispatch({ type: 'audio/setSetting', payload: { ...props.setting, [typeKey]: percent } })
    };
    const decline = () => {
        let percent = value - 10;
        if (percent < 0) {
            percent = 0;
        }
        props.dispatch({ type: 'audio/setSetting', payload: { ...props.setting, [typeKey]: percent } })
    };
    return <div className={classNames(style.vol, CommonStyle.BaseBackground)}>
        <div className={style.title}>{title}</div>
        <Abutton delay={0} type='small' onClick={decline} ><MinusOutlined /></Abutton>
        <IProgressBar percent={value} />
        <Abutton delay={0} type='small' onClick={increase} ><PlusOutlined /></Abutton>
    </div>
}
export default VolControllor