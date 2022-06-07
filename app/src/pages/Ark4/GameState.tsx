export interface Charaters {
    [charaterName: string]: string;
}

export interface ChapterState {
    bgmName?: string,
    bgmBase64Buff?: string;
    bgName?: string;
    bgBase64Buff?: string;
    charaters: Charaters;
    textAreaContent?: string;
    textAreaSpeaker?: string;
}
export const initChapterState: ChapterState = {
    bgmName: undefined,
    bgmBase64Buff: undefined,
    bgName: undefined,
    bgBase64Buff: undefined,
    charaters: {
    },
}

export interface GameState {
    name?: string;
}
export const initGameState: GameState = {
    name: 'rexxara'
}