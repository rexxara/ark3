import { ChapterState, CurrentChoose } from "../GameState";

export default function showChooseHandle(getState: () => ChapterState, param: CurrentChoose[]): Promise<ChapterState> {
    return new Promise<ChapterState>(res => {
        res({
            ...getState(),
            currentChoose: param
        })
    })
}