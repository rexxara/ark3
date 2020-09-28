import React, { useState } from 'react'
import '../style.css'
import { Input } from 'antd'
import Abutton from '../../Abutton'
interface IProps {
    clickCallback: Function,
    placeholder: string
}
export default function Inputs({ clickCallback, placeholder }: IProps) {
    const [value, setValue] = useState('')
    const [focusState, setForcusState] = useState('')
    const inputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value)
    }
    const onFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
        setForcusState(document.body.style.cssText)
        const preResize = window.onresize
        window.onresize = () => {
            document.body.style.cssText += 'width:100vw;height:100vh;transform:rotate(0deg);overflow:hidden;'
            window.onresize = preResize
        }
    }
    const onBlur = (ev: React.MouseEvent<HTMLElement>) => {
        const preResize = window.onresize
        window.onresize = () => {
            document.body.style.cssText = focusState
            window.onresize = preResize
        }
        setForcusState('')
        clickCallback(value)
    }
    const syncInput = <Input size='large'
        //onBlur={onBlur}
        onChange={inputChange}
        autoComplete="off"
        onFocus={onFocus}
        value={value}
        type="text"
        name='inputValue' />
    return <div className='InputCon'>
        {focusState.length > 0 && <div className='InputCover'>
            {placeholder}
            <div style={{ width: '80vw', marginLeft: '10vw' }}><Input size='large'
                //onBlur={onBlur}
                onChange={inputChange}
                autoComplete="off"
                //onFocus={onFocus}
                value={value}
                type="text"
                name='inputValue' /></div>
            <Abutton text="确认" onClick={onBlur} />
        </div>}
        {syncInput}
    </div>
}