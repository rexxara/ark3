import { SaveData } from '../components/Game/actions';
import script from '../scripts/index';
import { RawScript } from '../utils/types';
export interface globalState {
    script: string
    isAuto: boolean
    RawScript: RawScript
    edited: boolean
    test: string
    isReview: boolean;
    LoadDataFromLoadPage?: SaveData
}
const initalState: globalState = {
    script: '',
    edited: false,
    test: 'test',
    isAuto: false,
    RawScript: script as unknown as RawScript,
    isReview: false,
    LoadDataFromLoadPage: undefined,
}
export default {
    namespace: 'global',
    state: initalState,
    reducers: {
        'start'(state: globalState, { payload }: any) {
            setTimeout(() => {
                const { origin, pathname } = window.location
                window.location.href = origin + pathname + '#/mainGame'
            }, 0)
            return { ...initalState, RawScript: script }
        },
        'startArk4'(state: globalState, { payload }: any) {
            setTimeout(() => {
                const { origin, pathname } = window.location
                window.location.href = origin + pathname + '#/newCommandList'
            }, 0)
            return { ...initalState, RawScript: script }
        },
        // 'saveSetting'(state: globalState, { payload }: any) {
        //     return { ...state, ...payload }
        // },
        'load'(state: globalState, { payload }: any) {
            console.log(payload)
            setTimeout(() => {
                const { origin, pathname } = window.location
                window.location.href = origin + pathname + '#/mainGame'
            }, 0)
            return { ...initalState, LoadDataFromLoadPage: payload }
        },
        'reviewScence'(state: globalState, { payload }: any) {
            const script = payload.script.map((v: any, i: number) => {
                if (i === 0) {
                    return { ...v, isBegin: true }
                }
                return v
            })
            setTimeout(() => {
                const { origin, pathname } = window.location
                window.location.href = origin + pathname + '#/mainGame'
            }, 0)
            const newConbine = { ...script, chapters: { chapter1: script } }
            return { ...state, RawScript: newConbine, isReview: true }
        },
    },
    effects: {
        // *getSetting({ payload }: any, { put, call }: any) {
        //     const res= yield call(actions.getSetting)
        //     yield put({ type: 'saveSetting', payload: { setting: res } });
        // },
        // *setSetting({ payload }: any, { put, call }: any) {
        //     const res= yield call(actions.saveSetting,payload)
        //     yield put({ type: 'saveSetting', payload: { setting: res } });
        // },
    },
};