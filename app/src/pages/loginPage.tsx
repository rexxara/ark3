import React from 'react';
import Scence from '../components/scence'
import Abutton from '../components/Abutton/index'
import { connect } from 'dva'
import { AnyAction } from 'redux'
import { vh, vw } from '../utils/getSize'
import TitleCache from '../components/Game/titles/TitleCache'
import './index.css'
import { message } from 'antd';
interface Iprops {
    dispatch: (a: AnyAction) => AnyAction
}

const LoginPage = (props: Iprops) => {
    const startGame = () => {
        props.dispatch({
            type: 'global/start'
        })
        props.dispatch({ type: 'audio/stopBgm' })
    }
    const startArk4 = () => {
        props.dispatch({
            type: 'global/startArk4'
        })
        props.dispatch({ type: 'audio/stopBgm' })
    }
    React.useEffect(() => {
        props.dispatch({
            type: 'audio/playBgm',
            payload: 'theme'
        })
        message.info('2022年4月17日')
    }, []);
    return <Scence>
        {/* <Abutton to="/playGround" text="游乐场" /> */}
        <div className='bodyAnimate' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: vh(100), paddingLeft: vw(20), paddingRight: vw(20) }}>
            <Abutton onClick={startArk4} text="新游戏ver4" />
            <Abutton onClick={startGame} text="开始游戏" />
            <Abutton to='/loadPage' text="加载" />
            <Abutton to="/gallery" text="画廊" />
            <Abutton to="/ScenceReview" text="场景回想" />
            <Abutton to="/config" text="设置" />
            <Abutton to="/paintGame" text="灰度" />
        </div>
        <TitleCache />
    </Scence>
}
export default connect((store: any) => store)(LoginPage)