import React, { useEffect, useState } from "react";
import Abutton from "../../components/Abutton";
import useCommandQueue from "../../Hooks/useCommandQueue";
import { LoadedChapterModel3 } from "../../utils/types";
import { ChapterState } from "./GameState";
import Stage from "./Stage";
import { convertLineToQueueItem } from "./utils";
import { Ark4Helper } from "../../utils/ArkHelper";
import HotKey from "./HotKey";
import { Modal } from "antd";
import useBoolean from "../../Hooks/useBoolean";
interface IProps {
    state: ChapterState;
    currentSection: LoadedChapterModel3;
    nextHandle: (chapterState: ChapterState) => void;
}
export default function SectionProcessor(props: IProps) {

    const fnList = React.useMemo(() => {
        return props.currentSection.line.map((v, index) => { return convertLineToQueueItem(v, index, props.currentSection) })
    }, [props.currentSection.name])
    const commandQueue = useCommandQueue<any>(fnList, props.state, 0, props.nextHandle);
    useEffect(() => {
        if (commandQueue.index === props.currentSection.line.length) {
            props.nextHandle(commandQueue.state)
        }
    }, [commandQueue.index])
    useEffect(() => {
        commandQueue.resetQueue()
    }, [props.currentSection.name])
    useEffect(() => {
        commandQueue.resetState()
    }, [props.currentSection.arkMark])
    const [logModalVisible, showLog, hidLog] = useBoolean(false);
    return <div style={{ color: 'white' }}>
        <Modal onCancel={hidLog}
            visible={logModalVisible}
            footer={[]}>
            <div className="logContainer">
                {commandQueue.log.map(v => {
                    return <div key={v.key}>{v.value.join(':')}</div>
                })}
            </div>
        </Modal>
        <div style={{ position: 'absolute', left: '0', bottom: '0', zIndex: 20, width: '100vw', background: 'rgba(0,0,0,0.3)', overflow: 'hidden' }}>
            <div style={{ color: 'black' }}>
                {commandQueue.processing && <p>loading...</p>}
                {commandQueue.auto && <p>autoing...</p>}
            </div>
            <div style={{ display: 'flex' }}>
                <Abutton onClick={showLog}>log</Abutton>
                <Abutton onClick={() => {
                    commandQueue.setSkip(pre => !pre)
                    commandQueue.nextHandle();
                }}>{commandQueue.skip ? 'skipping' : 'startSkip'}</Abutton>
                <Abutton onClick={props.nextHandle}>nextChapter</Abutton>
                {!commandQueue.done && <Abutton onClick={commandQueue.nextHandle}>next</Abutton>}
                <Abutton onClick={commandQueue.auto ? commandQueue.disableAuto : commandQueue.setAuto}>auto</Abutton>
                <Abutton onClick={Ark4Helper.showReturnToTitleModal}>back</Abutton>
            </div>
        </div>
        <Stage skip={commandQueue.skip} auto={commandQueue.auto} nextHandle={commandQueue.nextHandle} state={commandQueue.state} />
        <HotKey commandQueue={commandQueue} />
    </div>
}