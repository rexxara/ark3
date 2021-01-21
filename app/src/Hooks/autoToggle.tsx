import React, { useState } from 'react'

export const useAutoToggle = (time = 1000) => {
    const [disable, setDisable] = useState(false)
    const timeRef: any = React.useRef()
    const toggle = (fn: Function) => (ev: any) => {
        if (timeRef.current) {
            return;
        }
        setDisable(true)
        timeRef.current = setTimeout(() => {
            setDisable(false)
            if (!disable) {
                fn()
            }
            timeRef.current = null
        }, time)
    }
    return [disable, toggle] as const
}