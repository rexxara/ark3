import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import './style.css'
import { CSSTransition } from 'react-transition-group';
import { useAutoToggle } from '../../Hooks/autoToggle';
import { connect } from 'dva';
//@ts-ignore
import { Howl, Howler } from 'howler'
import classNames from 'classnames';
interface IProps {
    text?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    to?: string,
    children?: React.ReactChild
    style?: React.CSSProperties
    type?: 'small' | 'big'
    [arg: string]: any
    exitActive?: string;
    delay?: number;
}

const clickAudio = new Howl({
    src: [require('./click.mp3')]
})
const hoverAudio = new Howl({
    src: [require('./hover.mp3')]
})
const Abutton = (props: IProps) => {
    const { type, dispatch, routing, global, historyStore, audio, className, delay, ...restProps } = props
    const { seVol } = audio
    useEffect(() => {
        clickAudio.volume(seVol / 100)
        hoverAudio.volume(seVol / 100)
    }, [seVol])
    const clickSound = () => {
        clickAudio.play()
    }
    const hoverSound = () => {
        hoverAudio.play()
    }
    const [disable, toggle] = useAutoToggle(delay ?? 1000, { beforeCallBack: clickSound })
    const clickWraper = toggle((ev: any) => {
        if (props.onClick) {
            props.onClick && props.onClick(ev)
        } else if (props.to) {
            props.historyStore.history.push(props.to)
        }
    })
    const BtnStyle: React.CSSProperties = {
        color: 'white',
        width: type === 'small' ? '6vw' : '12vw',
        height: type === 'small' ? '2vw' : '4vw',
        fontFamily: "Microsoft YaHei",
        border: 0,
        margin: '6px 12px',
        outline: 'none',
        cursor: 'pointer',
        letterSpacing: 1,
        ...props.style
    }
    return <CSSTransition
        in={!disable}
        timeout={1000}
        classNames={{
            enter: 'animate__animated',
            exit: 'animate__animated',
            exitActive: props.exitActive || 'animate__tada'
        }}
        mountOnEnter={true}
        unmountOnExit={true}
    >
        <button
            {...restProps}
            style={BtnStyle}
            onMouseEnter={hoverSound}
            onMouseLeave={hoverSound}
            onClick={clickWraper}
            className={classNames('Abutton', 'button-63', className)}>
            {props.text || props.children}
        </button>
    </CSSTransition>
}
const Provider = (props: IProps) => {
    return <Abutton {...props} />
}

export default connect((store: any) => store)(Provider)