import { displayLineParser } from "../../../components/Game/utils";
import { ChapterState } from "../GameState"


export default function rawLineHandler(getState: () => ChapterState, param: {
    value: string,
    chapterName: string
}): Promise<ChapterState> {
    const result = displayLineParser(param.value);
    return new Promise<ChapterState>(res => {
        res({
            ...getState(),
            textAreaContent: result._value, textAreaSpeaker: undefined,
            textAreaCenterd: result.centerd,
            textAreaSoundFilePath: result.soundSrc ? [param.chapterName, result.soundSrc].join('/') : undefined,
        })
    })
}