import { message } from "antd";
import React, { useEffect, useState } from "react";
import useBoolean from "./useBoolean";

export type QueueItem<T, U> = {
    function: ((state: T, param: any) => Promise<T>) | ((state: T, param: any) => T),
    args?: U
};
interface nextHandleOption {
    triggerByAuto: boolean;
}
const useCommandQueue = <T,>(queue: QueueItem<T, any>[], initState: T, initIndex?: number) => {
    const [state, setState] = useState<T>(initState);
    const [processing, setProcessing, stopProcessing] = useBoolean(false);
    const [auto, setAuto, disableAuto] = useBoolean(false);
    const [index, setIndex] = useState<number>(initIndex ?? 0);
    async function nextHandle(ev?: nextHandleOption | React.MouseEvent) {
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
                //next
                message.error('done')
            }
            setProcessing()
            try {
                console.log(currentTask.function);
                const res = await currentTask.function(state, currentTask.args);
                setState(res)
            } catch (error) {
                console.warn(error);
            } finally {
                stopProcessing();
                setIndex(index + 1);
                // if (auto) {
                //     console.log('next');
                //     nextHandle({ triggerByAuto: true })
                // }
            }
        }
    }
    const current = queue[index];
    const done = !current;
    useEffect(() => {
        if (auto && !done) {
            nextHandle({ triggerByAuto: true })
        }
    }, [auto, index, done])

    return { current, nextHandle, setAuto, state, processing, auto, done, disableAuto }
};

export default useCommandQueue;