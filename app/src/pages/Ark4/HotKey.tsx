import React, { useEffect } from 'react';
import { CommandQueue } from '../../Hooks/useCommandQueue';
import { ChapterState } from './GameState';
import { tinykeys } from "tinykeys"

interface IProps {
    commandQueue: CommandQueue<ChapterState>
}
export default function HotKey(props: IProps) {
    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            "Control": () => {
                props.commandQueue.setSkip(false);
            }
        },
            {
                event: "keyup",
            })
        return () => {
            unsubscribe()
        }
    })
    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            "Control": () => {
                if (!props.commandQueue.skip) {
                    props.commandQueue.setSkip(true);
                    props.commandQueue.nextHandle();
                }
            }
        },
            {
                event: "keydown",
            })
        return () => {
            unsubscribe()
        }
    })
    return <></>
}