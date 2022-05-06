import { message } from "antd";
import { ChapterState } from "../GameState";

export default function playBGMHandle(state: ChapterState, param: { name: string, src: string }) {
    const src = require(`../../../scripts/BGM/${param.src}`)
    if (state.bgmName === param.name) {
        message.warn('play sameBgm');
        return new Promise<ChapterState>(res => {
            res(state);
        });
    }
    return new Promise<ChapterState>((res) => {
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
            .then(blob => URL.createObjectURL(blob))
            .then(url => {
                const result: ChapterState = { ...state, bgmName: param.name, bgmBase64Buff: url }
                res(result);
            })
            .catch(err => console.error(err));
    })
};