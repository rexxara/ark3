import React, { useEffect, useRef } from "react";
import useBoolean from "./useBoolean";

export type QueueItem<T, U> = {
    function: ((getState: () => T, param: any) => Promise<T>) | ((getState: () => T, param: any) => T),
    args?: U,
    type: 'command' | 'line' | 'error'
};
interface nextHandleOption {
    triggerByAuto: boolean;
    triggerByCommandAuto: boolean;
}
const useCommandQueue = <T,>(queue: QueueItem<T, any>[], initState: T, initIndex?: number) => {
    const _state = useRef<T>(initState);
    const [processing, setProcessing, stopProcessing] = useBoolean(false);
    const [auto, setAuto, disableAuto] = useBoolean(false);
    const _index = useRef<number>(initIndex ?? 0);
    function getState(): T {
        return _state.current;
    }
    async function nextHandle(ev?: Partial<nextHandleOption> | React.MouseEvent) {
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
            }
            setProcessing()
            try {

                const res = await currentTask.function(getState, currentTask.args);
                _state.current = res;
            } catch (error) {
                console.warn(error);
            } finally {
                stopProcessing();
                _index.current = index + 1;
                if (currentTask.type === 'command') {
                    nextHandle({ triggerByCommandAuto: true })
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
            nextHandle({ triggerByAuto: true })
        }
    }, [auto, index, done])
    function resetState() {
        _state.current = initState;
        disableAuto();
    }
    function resetQueue() {
        _index.current = 0;
        nextHandle({ triggerByAuto: true })
    }
    return { current, nextHandle, setAuto, state, processing, auto, done, index, disableAuto, resetQueue, resetState }
};

export default useCommandQueue;