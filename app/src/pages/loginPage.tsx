import React, { MouseEventHandler, useEffect } from 'react';
import Scence from '../components/scence'
import Abutton from '../components/Abutton/index'
import { connect } from 'dva'
import { AnyAction } from 'redux'
import TitleCache from '../components/Game/titles/TitleCache'
import './index.css'
import { message } from 'antd';
import { useDefaultNames, Node, Motor, Events } from 'lume'
import TWEEN from '@tweenjs/tween.js';
import type { } from 'lume/dist/index.react-jsx'
import { Component, createRef, CSSProperties, ChangeEvent } from 'react'
import { is } from '../utils/lumeUtils';
import { vh, vw } from '../utils/getSize';
useDefaultNames()

type View = 'top' | 'side' | 'free'
interface Iprops {
  dispatch: (a: AnyAction) => AnyAction
}
interface IState {
  rotationDirection: -1 | 1
  rotationAmount: number // degrees
  rotationEnabled: boolean
  view: View
}

class LoginPage extends Component<Iprops, IState>{
  readonly state = {
    rotationDirection: 1 as -1 | 1, // clockwise
    rotationAmount: 0.2,
    rotationEnabled: true,
    view: 'free' as View,
  }
  con = createRef<HTMLDivElement>();
  astrobee = createRef<Node>()
  downTween: any;
  upTween: any;
  pressedButton: any;

  targetPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  startGame = () => {
    this.props.dispatch({
      type: 'global/start'
    })
    this.props.dispatch({ type: 'audio/stopBgm' })
  }
  initLume = () => {

    const scene: any = document.querySelector('#scene')
    const lightContainer: any = document.querySelector('#lightContainer')
    const light: any = document.querySelector('#light')
    scene.on(Events.GL_LOAD, async () => {
      await Promise.resolve()
      light.three.shadow.radius = 2
      light.three.distance = 800
      light.three.shadow.bias = -0.001

      Array.from(document.querySelectorAll('lume-mixed-plane')).forEach(function (n: any) {
        n.three.material.opacity = 0.3
      })
      const bg: any = document.querySelector('#bg');
      if (bg) {
        bg.three.material.opacity = 0.3
        //@ts-ignore
        bg.three.material.dithering = true
        //@ts-ignore
        scene.needsUpdate()
      }
    })
    this.con.current?.addEventListener('mousemove', this.mouseMove)

    Motor.addRenderTask(time => {
      lightContainer.position.x += (this.targetPosition.x - lightContainer.position.x) * 0.05
      lightContainer.position.y += (this.targetPosition.y - lightContainer.position.y) * 0.05
    })

    // On mouse down animate the button downward
    this.con.current?.addEventListener('mousedown', this.mouseDown)
    // On mouse up animate the button upward
    this.con.current?.addEventListener('mouseup', this.mouseUp)
  }
  mouseMove = (e: MouseEvent) => {
    e.preventDefault()
    this.targetPosition.x = e.clientX
    this.targetPosition.y = e.clientY
  }
  componentWillUnmount() {

    this.con.current?.removeEventListener('mouseup', this.mouseUp)
    this.con.current?.removeEventListener('mouseDown', this.mouseDown)
    this.con.current?.removeEventListener('mousemove', this.mouseMove)
  }
  mouseDown = (e: any) => {
    if (is(e.target, 'button')) {
      this.pressedButton = e.target

      if (this.upTween) {
        this.upTween.stop()
        this.upTween = null
      }

      this.downTween = new TWEEN.Tween(e.target.parentNode.position)
        .to({ z: -20 }, 75)
        .start()
        .onComplete(() => { this.downTween = null })

      Motor.addRenderTask((time) => {
        if (!this.downTween) return false
        this.downTween.update(time)
      })
    }
  }
  mouseUp = (e: MouseEvent) => {
    if (this.pressedButton) {
      if (this.downTween) {
        this.downTween.stop()
        this.downTween = null
      }

      this.upTween = new TWEEN.Tween(this.pressedButton.parentNode.position)
        .to({ z: 0 }, 75)
        .start()
        .onComplete(() => { this.upTween = null })

      Motor.addRenderTask((time) => {
        if (!this.upTween) return false
        this.upTween.update(time)
      })
    }
  }
  componentDidMount() {
    this.initLume();
    this.props.dispatch({
      type: 'audio/playBgm',
      payload: 'theme'
    })
    message.info('2021年12月13日')
  }
  render() {
    return <Scence>
      <TitleCache />
      <div ref={this.con} style={{ width: '100vw', height: '100vh' }} className='bodyAnimate'>

        <lume-scene
          webgl="true"
          id="scene"
          background-color="black"
          background-opacity="0"
          perspective="800"
          shadowmap-type="pcfsoft"
          touch-action="none"
        >
          <lume-ambient-light color="#ffffff" intensity="0"></lume-ambient-light>
          <lume-mixed-plane ref="plane" id="bg" size-mode="proportional proportional" size="1 1 0" color="#444">
            <lume-node
              id="button-container"
              position="0 0 20"
              size="600 31 0"
              align-point="0.5 0.5 0"
              mount-point="0.5 0.5 0"
            >
              {[<Abutton exitActive='animate__flash' style={{ margin: '0' }} onClick={this.startGame} text="开始游戏" />,
              <Abutton exitActive='animate__flash' style={{ margin: '0' }} to='/loadPage' text="加载" />,
              <Abutton exitActive='animate__flash' style={{ margin: '0' }} to="/gallery" text="画廊" />,
              <Abutton exitActive='animate__flash' style={{ margin: '0' }} to="/ScenceReview" text="场景回想" />,
              <Abutton exitActive='animate__flash' style={{ margin: '0' }} to="/config" text="设置" />,
              <Abutton exitActive='animate__flash' style={{ margin: '0' }} to="/paintGame" text="灰度" />].map((v, i) => {
                return <lume-mixed-plane
                  ref="btn"
                  key={i}
                  size-mode="literal proportional"
                  size={`${(vw(12, true) as number) * 0.75} ${(vw(6, true) as number) * 0.032} 0`}
                  align-point={`${(i - 1.5) * 0.028 * (vw(1, true) as number)} 0 0`}
                  mount-point={`${(i - 1.2) * 0.028 * (vw(1, true) as number)} 0 0`}
                  color="#444"
                >
                  {v}
                </lume-mixed-plane>
              })}
            </lume-node>
            <lume-node id="lightContainer" size="0 0 0" position="0 0 300">
              <lume-point-light
                id="light"
                color="white"
                size="0 0 0"
                cast-shadow="true"
                intensity="1"
              >
              </lume-point-light>
            </lume-node>
          </lume-mixed-plane>
        </lume-scene >
      </div>
    </Scence>
  }
}

export default connect((store: any) => store)(LoginPage)