import React from 'react';
export const useAnimationState = <T,>(initValue: T, timeout = 250) => {
    const [syncValue, setSyncValue] = React.useState<T>(initValue);
    const [asyncValue, setAsyncValue] = React.useState<T>(initValue);
    const timer = React.useRef<any>();
    const setAsyncValueHandle = (value: T) => {
        if (timer.current) {
            return;
        }
        setSyncValue(value);
        timer.current = setTimeout(() => {
            setAsyncValue(value);
            timer.current = undefined;
        }, timeout);
    };
    const setSyncValueHandle = (value: T) => {
        setSyncValue(value);
        setAsyncValue(value);
    };
    const result: [
        T,
        T,
        (value: T) => void,
        (value: T) => void
    ] = [
            syncValue,
            asyncValue,
            setSyncValueHandle,
            setAsyncValueHandle
        ];
    return result;
};