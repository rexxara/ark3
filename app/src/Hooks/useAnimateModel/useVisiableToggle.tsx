import React, { useEffect } from 'react';
import { useAnimationState } from './useAnimationState';
const useVisiableToggle = <T,>(item: T | undefined) => {
    const [syncState, asyncState, setSyncValue, asyncSetData] = useAnimationState<T | undefined>(undefined);
    const togglehandle = () => {
        if (!asyncState && !syncState) {//关闭，打开
            show();
        }
        if (asyncState && syncState) {
            hide();
        }
    };
    const show = (newItem?: any) => setSyncValue(newItem || item);
    const hide = () => asyncSetData(undefined);
    const closing = !!(!syncState && asyncState);
    const key = React.useRef(0);
    const classname = 'animatedModal' + key.current;
    useEffect(() => {
        if (syncState) {
            const doms = document.getElementsByClassName(classname);
            if (!doms.length) {
                return;
            }
            for (let index = 0; index < doms.length; index++) {
                const element = doms[index];
                element.classList.add('fadeIn');
            }
        }
    }, [syncState]);
    React.useEffect(() => {
        key.current = Date.now().valueOf();
    }, []);
    React.useEffect(() => {
        if (closing) {
            const doms = document.getElementsByClassName(classname);
            if (!doms.length) {
                return;
            }
            for (let index = 0; index < doms.length; index++) {
                const element = doms[index];
                element.classList.remove('fadeIn');
                element.classList.add('fadeOut');
            }
        }
    }, [closing]);
    const result: [T | undefined, string, (item?: T) => void, () => void, () => void, T | undefined] = [
        asyncState,
        classname,
        show,
        hide,
        togglehandle,
        syncState,
    ];
    return result;
};

export default useVisiableToggle;