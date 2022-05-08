import { ChapterState } from "../GameState";
import { getBase64FromSrc } from "./playBGMHandle";

export default function showBackgroundHandle(getState: () => ChapterState, param: string) {
    const src = require(`../../../scripts/backgrounds/${param}`)
    if (getState().bgName === param) {//loadSamebackground
        return new Promise<ChapterState>(res => {
            res(getState());
        });
    }
    return new Promise<ChapterState>(res => {
        getBase64FromSrc(src).then((url: string) => {
            const result: ChapterState = { ...getState(), bgName: param, bgBase64Buff: url }
            res(result);
        }).catch(err => console.error(err));
    })
}
