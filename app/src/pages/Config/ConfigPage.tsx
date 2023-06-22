import * as React from 'react'
import SettingComp from '../../components/Game/component/SettingComponent/SettingComp'
import BackBtn from '../../components/BackBtn'
import style from './style.module.css';
import classNames from 'classnames';
import CommonStyle from '../../components/Game/component/CommonStyle';
import { WithAnimationProps } from '../../components/HOC/animation';
interface IProps extends WithAnimationProps {

}
const ConfigPage = (props: IProps) => {
    const [show, setShow] = React.useState(true);
    return <div className={classNames(style.configCon, CommonStyle.baseForeGround)}>
        <div className={classNames(style.config, show ? 'animate__backInUp' : 'animate__backOutUp', 'animate__animated')}>
            <div className={style.header}>
                <div className={style.menuCircle}></div>
            </div>
            <SettingComp />
            <BackBtn beforeBack={() => {
                setShow(false)
            }} className={style.backButton} />
        </div>
    </div>
}
export default ConfigPage