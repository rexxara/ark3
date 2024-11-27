export interface Charaters {
    [charaterName: string]: string;
}
export interface CurrentChoose {
    text: string;
    callback: (variables: any) => any;
};
export interface ChapterState {
    bgmName?: string,
    bgmBase64Buff?: string;
    bgName?: string;
    bgBase64Buff?: string;
    charaters: Charaters;
    textAreaContent?: string;
    textAreaSpeaker?: string;
    textAreaSoundFilePath?: string;
    commandId?: string;
    textAreaCenterd?: boolean;
    speakerCenterd?: boolean;
    currentChoose: CurrentChoose[]
}
export const getInitChapterState = () => {
    const res: ChapterState = {
        bgmName: undefined,
        bgmBase64Buff: undefined,
        bgName: undefined,
        bgBase64Buff: undefined,
        charaters: {
        },
        currentChoose: []
    }
    return res;
}

export interface GameState {
    name?: string;
}
export const initGameState: GameState = {
    name: 'rexxara'
}