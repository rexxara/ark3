import * as React from 'react'
import Abutton from '../components/Abutton'
import { back } from '../utils/utils'
interface IProps {
    className?: string;
    beforeBack?: Function;
}
const BackBtn = (props: IProps) => {
    const backHandle = () => {
        props.beforeBack?.();
        back()
    }
    return <Abutton delay={0} className={props.className} onClick={backHandle} >返回</Abutton>
}
export default BackBtn