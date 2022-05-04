import React from "react";
import Abutton from "../components/Abutton";
import useCommandQueue, { QueueItem } from "../Hooks/useCommandQueue";

interface IState {
    count: number;
    text: string;
}
const initState: IState = {
    count: 1,
    text: 'rexxara'
}
function wait(state: IState, time: number) {
    const promise = new Promise<IState>(res => {
        setTimeout(() => {
            res(state)
        }, time);
    })
    return promise
}
function addCount(state: IState, time: number): IState {

    return { ...state, count: state.count + time || 1 };
}
function addText(state: IState, char: string): IState {
    return { ...state, text: state.text + char || 'A' };
}
const commands: QueueItem<IState, any>[] = [
    { function: addCount, args: 1 },
    { function: wait, args: 2000 },
    { function: addCount, args: 1 },
    { function: addText, args: 'A' },
    { function: wait, args: 2000 },
    { function: addText, args: 'B' },
    { function: wait, args: 2000 },
    { function: addText, args: 'C' },
    { function: wait, args: 2000 },
    { function: addText, args: 'D' },
    { function: wait, args: 2000 },
    { function: addText, args: 'DD' },
];
export default function NewCommandList() {
    const commandQueue = useCommandQueue(commands, initState);
    return <div style={{ color: 'white' }}>
        <p>count:{commandQueue.state.count}</p>
        <p>text:{commandQueue.state.text}</p>
        {commandQueue.processing && <p>loading...</p>}
        {commandQueue.auto && <p>autoing...</p>}
        {!commandQueue.done && <Abutton onClick={commandQueue.nextHandle}>next</Abutton>}
        <Abutton onClick={commandQueue.setAuto}>auto</Abutton>
    </div>
}