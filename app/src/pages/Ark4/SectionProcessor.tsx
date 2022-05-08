import React, { useEffect } from "react";
import Abutton from "../../components/Abutton";
import useCommandQueue from "../../Hooks/useCommandQueue";
import { LoadedChapterModel3 } from "../../utils/types";
import { ChapterState } from "./GameState";
import Stage from "./Stage";
import { convertLineToQueueItem } from "./utils";

interface IProps {
    state: ChapterState;
    currentSection: LoadedChapterModel3;
    nextHandle: (chapterState: ChapterState) => void;
}
export default function SectionProcessor(props: IProps) {
    const fnList = React.useMemo(() => {
        return props.currentSection.line.map(convertLineToQueueItem)
    }, [props.currentSection.name])
    const commandQueue = useCommandQueue(fnList, props.state);
    useEffect(() => {
        if (commandQueue.index === props.currentSection.line.length) {
            props.nextHandle(commandQueue.state)
            console.log('callNext')
        }
    }, [commandQueue.index])
    useEffect(() => {
        commandQueue.resetQueue()
    }, [props.currentSection.name])
    useEffect(() => {
        commandQueue.resetState()
    }, [props.currentSection.arkMark])
    return <div style={{ color: 'white' }}>
        <div style={{ position: 'absolute', left: '0', bottom: '0', zIndex: 2, width: '100vw', background: 'white', overflow: 'hidden' }}>
            <div style={{ color: 'black' }}>
                {commandQueue.processing && <p>loading...</p>}
                {commandQueue.auto && <p>autoing...</p>}
            </div>
            <div style={{ display: 'flex' }}>
                <Abutton onClick={props.nextHandle}>nextChapter</Abutton>
                {!commandQueue.done && <Abutton onClick={commandQueue.nextHandle}>next</Abutton>}
                <Abutton onClick={commandQueue.auto ? commandQueue.disableAuto : commandQueue.setAuto}>auto</Abutton>
            </div>
        </div>
        <Stage state={commandQueue.state} />
    </div>
}