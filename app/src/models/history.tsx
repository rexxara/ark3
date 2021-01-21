
export interface HistoryState {
    history: any
}
const initalState = {
    history: undefined
}
export default {
    namespace: 'historyStore',
    state: initalState,
    reducers: {
        'setHistory'(state: HistoryState, { payload }: any) {
            return { history: payload }
        },
    },
    effects: {
    },
};