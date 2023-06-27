//@ts-ignore
import { Howl, Howler } from 'howler'
import { actions } from '../components/Game'
import { AUDIO_AMOUNT_INIT_SETTING, AudioAmountSetting } from '../components/Game/actions'
const playerFactory = (src: any, vol: number) => {
    return new Howl({
        loop: true,
        src: [src],
        volume: vol / 100,
    })
}
export interface AudioState extends AudioAmountSetting {
    bgm: any
}
const initalState = {
    bgm: undefined,
    ...AUDIO_AMOUNT_INIT_SETTING
}
export default {
    namespace: 'audio',
    state: initalState,
    reducers: {
        'saveSetting'(state: AudioState, { payload }: any) {
            const { setting } = payload
            if (state.bgm) {
                state.bgm.volume(setting.bgmVol / 100)
            }
            return { ...state, bgmVol: setting.bgmVol, seVol: setting.seVol, chVol: setting.chVol }
        },
        'stopBgm'(state: AudioState, { payload }: any) {
            if (state.bgm) {
                state.bgm.stop()
            }
            return state;
        },
        'playBgm'(state: AudioState, { payload }: any) {
            if (state.bgm) {
                state.bgm.stop()
            }
            switch (payload) {
                case 'theme':
                    const theme = playerFactory(require('../components/SoundPlayer/title.m4a'), state.bgmVol)
                    theme.play()
                    return { ...state, bgm: theme }
                default:
                    return state
            }
        },
    },
    effects: {
        *getSetting({ payload }: any, { put, call }: any) {
            //@ts-ignore
            const res = yield call(actions.getSetting);
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
            //@ts-ignore
            const res = yield call(actions.saveSetting, props)
            yield put({ type: 'saveSetting', payload: { setting: res } });
        },
    },
};