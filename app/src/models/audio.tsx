//@ts-ignore
import { Howl, Howler } from 'howler'
import { actions } from '../components/Game'
const playerFactory = (src: any, vol: number) => {
    return new Howl({
        loop: true,
        src: [src],
        volume: vol / 100,
    })
}
export interface AudioState {
    bgm: any
    bgmVol: number
    seVol: number
}
const initalState = {
    bgm: undefined,
    bgmVol: 100,
    seVol: 100,
}
export default {
    namespace: 'audio',
    state: initalState,
    reducers: {
        'saveSetting'(state: AudioState, { payload }: any) {
            const { setting } = payload
            if(state.bgm){
                state.bgm.volume(setting.bgmVol/100)
            }
            return { ...state, bgmVol: setting.bgmVol, seVol: setting.seVol }
        },
        'playBgm'(state: AudioState, { payload }: any) {
            if (state.bgm) {
                state.bgm.stop()
            }
            switch (payload) {
                case 'theme':
                    const theme = playerFactory(require('../components/SoundPlayer/title.mp3'), state.bgmVol)
                    theme.play()
                    return { ...state, bgm: theme }
                case 'theme2':
                    const theme2 = playerFactory(require('../components/SoundPlayer/theme2.mp3'), state.bgmVol)
                    theme2.play()
                    return { ...state, bgm: theme2 }
                default:
                    return state
            }
        },
    },
    effects: {
        *getSetting({ payload }: any, { put, call }: any) {
            const res = yield call(actions.getSetting)
            console.log(res)
            yield put({ type: 'saveSetting', payload: { setting: res } });
        },
        *setSetting({ payload }: any, { put, call }: any) {
            let props: any = {}
            for (const key in payload) {
                if (typeof payload[key] === 'string' || typeof payload[key] === 'number') {
                    props[key] = payload[key]
                } else {
                }
            }
            const res = yield call(actions.saveSetting, props)
            yield put({ type: 'saveSetting', payload: { setting: res } });
        },
    },
};