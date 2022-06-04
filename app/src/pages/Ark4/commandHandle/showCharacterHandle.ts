import { ChapterState } from "../GameState";
import { getBase64FromSrc } from "./playBGMHandle";
interface IParam {
    name: string,
    emotion: string
}
export default function showCharacterHandle(getState: () => ChapterState, param: IParam) {
    const src = require(`../../../scripts/charatersImages/${param.name}/${param.emotion}`)
    return new Promise<ChapterState>(res => {
        getBase64FromSrc(src).then((url: string) => {
            const state = getState();
            const { charaters } = state;
            charaters[param.name] = url;
            const result: ChapterState = { ...state, charaters: charaters }
            res(result);
        }).catch(err => console.error(err));
    })
}
