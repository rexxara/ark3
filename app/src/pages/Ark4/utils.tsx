import { message } from "antd";
import { QueueItem } from "../../Hooks/useCommandQueue";
import { CommandLine, DisplayLine, LINE_TYPE, LoadedChapterModel3 } from "../../utils/types";
import playBGMHandle from "./commandHandle/playBGMHandle";
import showBackgroundHandle from "./commandHandle/showBackgroundHandle";
import showCharacterHandle from "./commandHandle/showCharacterHandle";
import rawLineHandle from './commandHandle/rawLineHandle'
import { ChapterState } from "./GameState";
import chatHandle from "./commandHandle/chatHandle/index";

export function convertLineToQueueItem(params: CommandLine | DisplayLine, index: number, chapter: LoadedChapterModel3): QueueItem<ChapterState, any> {
    const commandId = chapter.name + "|" + index;
    if (isCommandLine(params)) {
        if (params.command === LINE_TYPE.COMMAND_PLAY_BGM) {
            return { function: playBGMHandle, args: params.param, type: 'command' };
        }
        if (params.command === LINE_TYPE.COMMAND_SHOW_BACKGROUND) {
            return { function: showBackgroundHandle, args: params.param, type: 'command' };
        }
        if (params.command === LINE_TYPE.COMMAND_ENTER_CHARATER) {
            return { function: showCharacterHandle, args: params.param, type: 'command' };
        }
    }
    if (isDisplayLine(params)) {
        if (params.type === 'raw') {
            return {
                function: rawLineHandle, args: {
                    value: params.value,
                    chapterName: chapter.name,
                }, type: 'line'
            };
        }
        if (params.type === 'chat') {
            return {
                function: chatHandle, args: {
                    ...params,
                    chapterName: chapter.name,
                    commandId: commandId
                }, type: 'line'
            };
        }
        return { function: wait, args: { time: 1000, raw: JSON.stringify(params) }, type: 'line' };
    }
    return { function: wait, args: { time: 1000, raw: JSON.stringify(params) }, type: 'error' };
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