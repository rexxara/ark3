
import React from 'react';
import { Characters, LoadedChapterModel3, ChapterCaches } from '../../../utils/types';

export interface GameModel4 {
    charaters: Characters;
    chapters: LoadedChapterModel3[];
    caches: ChapterCaches;
}

export interface DataContextType {
    data: GameModel4;
    loaded: boolean;
}

export const DataContextDefaultValue: DataContextType = {
    data: {
        charaters: {},
        chapters: [],
        caches: {}
    },
    loaded: false
};
export const DataContext = React.createContext<{
    context: DataContextType;
    dispatch?: (action: { type: keyof DataContextType, payload?: any }) => void
}>({ context: DataContextDefaultValue });

function reducer(state: DataContextType, action: { type: keyof DataContextType, payload?: any }): DataContextType {
    switch (action.type) {
        case 'data':
            return { ...state, data: action.payload, loaded: true };
        default:
            return state;
    }
}

export const KeywordsContextProvider = (props: any) => {
    const [value, dispatch] = React.useReducer(reducer, DataContextDefaultValue);
    return <DataContext.Provider value={{ context: value, dispatch: dispatch }}>
        {props.children}
    </DataContext.Provider>;
};