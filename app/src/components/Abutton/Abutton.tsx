import React, { useCallback, useRef, useState } from 'react';
import './style.css'
import { Link } from 'dva/router'
import { vw, vh } from '../../utils/getSize'
import { CSSTransition } from 'react-transition-group';
interface IProps {
    text?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    to?: string,
    children?: React.ReactChild
    style?: React.CSSProperties
    type?: 'small' | 'big'
    [arg: string]: any
}

const Abutton = (props: IProps) => {
    const { type, ...restProps } = props
    const [disable, setDisable] = useState(false)
    const timeRef: any = useRef(undefined)
    const clickWraper = useCallback((ev) => {
        if (!disable) {
            if (props.onClick) {
                setDisable(true)
                timeRef.current = setTimeout(() => {
                    //props.onClick && props.onClick(ev)
                    setDisable(false)
                }, 1000);
            }
        }
    }, [props.onClick, disable])
    const BtnStyle: React.CSSProperties = {
        color: 'white',
        minWidth: type === 'small' ? vw(10) : vw(20),
        height: type === 'small' ? vw(5) : vw(10),
        background: '#313131',
        fontFamily: "Microsoft YaHei",
        border: 0,
        margin: '6px 12px',
        outline: 'none',
        cursor: 'pointer',
        letterSpacing: 1,
        ...props.style
    }
    const res = props.to ? <Link to={props.to}><button
        {...restProps}
        style={BtnStyle}
        onClick={clickWraper}
        className="Abutton">
        {props.text || props.children}
    </button></Link> : <button
        {...restProps}
        style={BtnStyle}
        onClick={clickWraper}
        className="Abutton">
            {props.text || props.children}
        </button>
        
        return <CSSTransition
        in={!disable}
        timeout={1000}
        classNames={{
            enter: 'animate__animated',
            exit: 'animate__animated',
            exitActive: 'animate__tada'
        }}
        mountOnEnter={true}
        unmountOnExit={true}
    >
        {res}
    </CSSTransition>
}


export default Abutton