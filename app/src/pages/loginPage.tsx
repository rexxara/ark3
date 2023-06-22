import React from 'react';
import Scence from '../components/scence'
import Abutton from '../components/Abutton/index'
import { connect } from 'dva'
import { AnyAction } from 'redux'
import TitleCache from '../components/Game/titles/TitleCache'
import './index.css'
import { message } from 'antd';
import classNames from 'classnames';
import CommonStyle from '../components/Game/component/CommonStyle';
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
        message.info('2023年6月23日')
    }, []);
    return <Scence>
        {/* <Abutton to="/playGround" text="游乐场" /> */}
        <div className={classNames('loginPageBackground', CommonStyle.flexCenter)} style={{
            backgroundImage: `url(${require("../scripts/cover.png")})`,
        }}>
            <Abutton onClick={startArk4} text="开始游戏" />
            {/* <Abutton onClick={startGame} text="开始游戏" /> */}
            <Abutton to='/loadPage' text="加载" />
            <Abutton to="/gallery" text="画廊" />
            <Abutton to="/ScenceReview" text="场景回想" />
            <Abutton to="/config" text="设置" />
            {/* <Abutton to="/paintGame" text="灰度" /> */}
        </div>
        <TitleCache />
    </Scence>
}
export default connect((store: any) => store)(LoginPage)