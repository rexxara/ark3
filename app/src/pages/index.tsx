import React from 'react';
import './index.css';
import 'animate.css'
import { Route, HashRouter } from 'dva/router';
import IniPage from './loadingPages/IniPage'
import copyrightPage from './loadingPages/copyrightPage'
import playGround from './playGround/index'
import loginPage from './loginPage'
import warpedAnimation from '../components/HOC/animation'
import MainGame from './MainGame'
import HomePage from './loadingPages/HomePage'
import Gallery from './Gallery'
import ScenceReview from './ScenceReview'
import LoadPage from './loadPage'
import detectOrient from '../utils/detectOrient'
import { vh, vw } from '../utils/getSize'
import PaintGame from './paintGame/index'
import ConfigPage from './ConfigPage'
import Init from './Init'
import { isAndroid } from '../utils/utils';

if (!isAndroid()) {//ios only
  detectOrient()
}
const WarpedIniPage = warpedAnimation(IniPage)
const WarpedCopyrightPage = warpedAnimation(copyrightPage)
const WarpedLoginPage = warpedAnimation(loginPage)
const WarpedGallery = warpedAnimation(Gallery)
const WarpedScenceReview = warpedAnimation(ScenceReview)
const WarpedMainGame = warpedAnimation(MainGame)
const WarpedLoadPage = warpedAnimation(LoadPage)
const WarpedConfigPage = warpedAnimation(ConfigPage)

// document.oncontextmenu = function () {
//   return false;
// }
const indexStyle: React.CSSProperties = {
  height: vh(100), width: vw(100),
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'black',
  backgroundSize: 'Contain',
  backgroundPosition: 'center center'
}

interface IProps {
  history: any
}
const App: React.FC<IProps> = ({ history }) => {
  return <>
    <HashRouter>
      <div style={indexStyle} className='App'>
        <title>kimi no hanashi</title>
        <Route exact path="/" children={props => <WarpedIniPage  {...props} />} />
        <Route path="/copyrightPage" children={props => <WarpedCopyrightPage {...props} />} />
        <Route path="/playGround" component={playGround} />
        <Route path="/homePage" component={HomePage} />
        <Route path="/mainGame" children={props => <WarpedMainGame {...props} />} />

        <Route path="/loginPage" children={props => <WarpedLoginPage {...props} />} />

        <Route path="/gallery" children={props => <WarpedGallery {...props} />} />
        <Route path="/ScenceReview" children={props => <WarpedScenceReview {...props} />} />
        <Route path="/loadPage" children={props => <WarpedLoadPage {...props} />} />
        <Route path="/config" children={props => <WarpedConfigPage {...props} />} />
        <Route path="/paintGame" component={PaintGame}></Route>
      </div>
    </HashRouter>
    <Init historyObj={history} /></>
}
export default App;