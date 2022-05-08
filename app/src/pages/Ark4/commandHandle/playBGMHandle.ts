import { message } from "antd";
import { ChapterState } from "../GameState";

export default function playBGMHandle(getState: () => ChapterState, param: { name: string, src: string }) {
    const src = require(`../../../scripts/BGM/${param.src}`)
    if (getState().bgmName === param.name) {
        message.warn('play sameBgm');
        return new Promise<ChapterState>(res => {
            res(getState());
        });
    }
    return new Promise<ChapterState>(res => {
        getBase64FromSrc(src).then((url: string) => {
            const result: ChapterState = { ...getState(), bgmName: param.name, bgmBase64Buff: url }
            res(result);
        }).catch(err => console.error(err));
    })
};


export function getBase64FromSrc(src: string) {
    return new Promise<string>((res) => {
        fetch(src).then(response => {
            if (!response.body) {
                throw new Error("bgmNotFound");
            }
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();
                    function pump(): any {
                        return reader.read().then(({ done, value }) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                }
            })
        }).then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => URL.createObjectURL(blob)).then((data) => res(data))
    })
};