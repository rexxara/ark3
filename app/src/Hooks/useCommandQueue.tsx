import React, { useEffect, useRef, useState } from "react";
import useBoolean from "./useBoolean";
import { useLatest } from "react-use";
import { Ark4Helper } from "../utils/ArkHelper";

export type QueueItem<T, U> = {
    function: ((getState: () => T, param: any) => Promise<T>) | ((getState: () => T, param: any) => T),
    args?: U,
    type: 'command' | 'line' | 'error'
};
interface nextHandleOption {
    triggerByAuto: boolean;
    triggerByCommandAuto: boolean;
}
export type NextHandle = (ev?: Partial<nextHandleOption> | React.MouseEvent) => Promise<void>;
export interface CommandQueue<T> {
    current: QueueItem<T, any>;
    nextHandle: (ev?: Partial<nextHandleOption> | React.MouseEvent) => Promise<void>;
    setAuto: () => void;
    state: T;
    processing: boolean;
    auto: boolean;
    done: boolean;
    index: number;
    skip: boolean;
    disableAuto: () => void;
    resetQueue: () => void;
    resetState: () => void;
    setSkip: React.Dispatch<React.SetStateAction<boolean>>;
    log: { key: string, value: string[] }[];
}

function useCommandQueue<T>(queue: QueueItem<T, any>[], initState: T, initIndex?: number): CommandQueue<T> {
    const _state = useRef<any>(initState);
    const [processing, setProcessing, stopProcessing] = useBoolean(false);
    const [log, setLog] = useState<{ key: string, value: string[] }[]>([]);
    const [auto, setAuto, disableAuto] = useBoolean(false);

    const [skip, setSkip] = useState<boolean>(false);
    const _skip = useLatest(skip);
    const _index = useRef<number>(initIndex ?? 0);
    function getState(): T {
        return _state.current;
    }
    async function nextHandle(ev?: Partial<nextHandleOption> | React.MouseEvent): Promise<void> {
        if (_skip.current) {
            setTimeout(() => {
                nextHandle();
            }, 100);
        }
        if (ev && 'triggerByCommandAuto' in ev) {
            //
        }
        const index = _index.current;
        if (ev && 'triggerByAuto' in ev) {
            //autoing
        } else {
            disableAuto();
            //click disableAuto
        }
        if (processing) {
            //message.warn('doing')
        } else {
            const currentTask = queue[index];
            if (!currentTask) {
                //outof boundary
                setSkip(false);
                Ark4Helper.showReturnToTitleModal();
                //message.warn('outof boundary')
                return;
            }
            setProcessing();
            try {
                const res = await currentTask.function(getState, currentTask.args);
                console.log(res);
                _state.current = res;
            } catch (error) {
                console.warn(error);
            } finally {
                stopProcessing();
                _index.current = index + 1;
                if (currentTask.type === 'command') {
                    nextHandle({ triggerByCommandAuto: true });
                } else if (currentTask.type === 'line') {
                    const value = [_state.current.textAreaSpeaker, _state.current.textAreaContent].filter(v => v);
                    setLog([...log, { key: _index.current + '', value: value }])
                }
            }
        }
    }
    const index = _index.current;
    const state = _state.current;
    const current = queue[index];
    const done = index > queue.length;
    useEffect(() => {
        if (auto && !done) {
            nextHandle({ triggerByAuto: true });
        }
    }, [auto, index, done]);
    function resetState() {
        _state.current = initState;
        disableAuto();
    }
    function resetQueue() {
        _index.current = 0;
        nextHandle({ triggerByAuto: true });
    }
    return {
        current,
        nextHandle, setAuto,
        state, processing,
        auto, done,
        index, skip,
        disableAuto, resetQueue, resetState, setSkip,
        log
    };
}

export default useCommandQueue;