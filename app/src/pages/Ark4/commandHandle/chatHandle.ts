import { ChapterState } from "../GameState"
import showCharacterHandle from "./showCharacterHandle";


interface Param {
    name: string;
    value: string;
    emotion: string;
}
export default function chatHandle(getState: () => ChapterState, param: Param): Promise<ChapterState> {
    return new Promise<ChapterState>(async res => {
        const loadedCh = await showCharacterHandle(getState, { name: param.name, emotion: param.emotion });
        res({ ...loadedCh, textAreaContent: param.value, textAreaSpeaker: param.name })
    })
}