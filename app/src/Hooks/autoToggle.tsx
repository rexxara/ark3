import React, { useState } from 'react'
type Setting = {
    isBefore?: boolean,
    beforeCallBack?: Function
}
export const useAutoToggle = (time = 1000, setting: Setting = {
    isBefore: false,
    beforeCallBack: undefined
}) => {
    const { isBefore, beforeCallBack } = setting
    const [disable, setDisable] = useState(false)
    const timeRef: any = React.useRef()
    const toggle = (fn: Function) => (ev: any) => {
        if (timeRef.current) {
            return;
        }
        if (typeof beforeCallBack === 'function') {
            beforeCallBack()
        }
        setDisable(true)
        if (isBefore) {
            timeRef.current = true
            if (!disable) {
                fn()
            }
            setTimeout(() => {
                setDisable(false)
                timeRef.current = false
            }, time);
        } else {
            timeRef.current = setTimeout(() => {
                setDisable(false)
                if (!disable) {
                    fn()
                }
                timeRef.current = null
            }, time)
        }
    }
    return [disable, toggle] as const
}