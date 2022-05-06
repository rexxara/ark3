import React from "react";
import Abutton from "../../components/Abutton";
import useCommandQueue from "../../Hooks/useCommandQueue";
import { CommandLine, DisplayLine } from "../../utils/types";
import { ChapterState } from "./GameState";
import Stage from "./Stage";
import { convertLineToQueueItem } from "./utils";

interface IProps {
    state: ChapterState;
    line: (CommandLine | DisplayLine)[]
}
export default function SectionProcessor(props: IProps) {
    const fnList = React.useMemo(() => {
        return props.line.map(convertLineToQueueItem)
    }, [props.line])
    const commandQueue = useCommandQueue(fnList, props.state);
    return <div style={{ color: 'white' }}>
        <Stage state={commandQueue.state}/>
        {commandQueue.processing && <p>loading...</p>}
        {commandQueue.auto && <p>autoing...</p>}
        {!commandQueue.done && <Abutton onClick={commandQueue.nextHandle}>next</Abutton>}
        <Abutton onClick={commandQueue.setAuto}>auto</Abutton>
    </div>
}