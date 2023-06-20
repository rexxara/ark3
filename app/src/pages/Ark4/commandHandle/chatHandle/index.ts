import { ChapterState } from "../../GameState"
import showCharacterHandle from "../showCharacterHandle";
import { textAreaParser } from "./textAreaParser";


interface Param {
    name: string;
    value: string;
    emotion: string;
    chapterName: string;
    commandId: string;
}
export default function chatHandle(getState: () => ChapterState, param: Param): Promise<ChapterState> {
    return new Promise<ChapterState>(async res => {
        const loadedCh = await showCharacterHandle(getState, { name: param.name, emotion: param.emotion });
        const result = textAreaParser(param.value);
        res({
            ...loadedCh,
            textAreaContent: result.text,
            textAreaSpeaker: param.name,
            textAreaSoundFilePath: result.soundFilePath ? [param.chapterName, result.soundFilePath].join('/') : undefined,
            commandId: param.commandId,
        })
    })
}


