import { ChapterState } from "../GameState"


export default function rawLineHandler(getState: () => ChapterState, param: string): Promise<ChapterState> {
    return new Promise<ChapterState>(res => {
        res({ ...getState(), textAreaContent: param,textAreaSpeaker:undefined })
    })
}