import { message } from "antd";
import { QueueItem } from "../../Hooks/useCommandQueue";
import { CommandLine, DisplayLine, LINE_TYPE } from "../../utils/types";
import playBGMHandle from "./commandHandle/playBGMHandle";
import showBackgroundHandle from "./commandHandle/showBackgroundHandle";
import { ChapterState } from "./GameState";

export function convertLineToQueueItem(params: CommandLine | DisplayLine): QueueItem<ChapterState, any> {
    if (isCommandLine(params)) {
        if (params.command === LINE_TYPE.COMMAND_PLAY_BGM) {
            return { function: playBGMHandle, args: params.param };
        }
        if (params.command === LINE_TYPE.COMMAND_SHOW_BACKGROUND) {
            return { function: showBackgroundHandle, args: params.param };
        }
    }

    return { function: wait, args: { time: 1000, raw: JSON.stringify(params) } };
}
function wait(getState: () => ChapterState, params: { time: number, raw: string }) {
    const promise = new Promise<ChapterState>(res => {
        setTimeout(() => {
            res(getState())
            message.info(params.raw);
        }, params.time);
    })
    return promise;
}


function isCommandLine(line: CommandLine | DisplayLine): line is CommandLine {
    if ('command' in line) {
        return true
    }
    return false;
}
function isDisplayLine(line: CommandLine | DisplayLine): line is DisplayLine {
    return !isCommandLine(line);
}