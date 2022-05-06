export interface ChapterState {
    bgmName?: string,
    bgmBase64Buff?: string
}
export const initChapterState: ChapterState = {
    bgmName: undefined,
    bgmBase64Buff: undefined
}

export interface GameState {
    name?: string;
}
export const initGameState: GameState = {
    name: 'rexxara'
}