import { displayLineParser } from "../../../../components/Game/utils";

export function textAreaParser(value: string) {
    //你想听什么？呵呵......[Line="01-what-do-you-want.mp4"][centerd]
    //https://github.com/gbaker1976/html-ast/blob/master/html-ast.js
    const res = displayLineParser(value);
    return {
        text: res._value,
        soundFilePath: res.soundSrc,
    };
}
