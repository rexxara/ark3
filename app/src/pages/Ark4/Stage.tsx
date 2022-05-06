import React from 'react';
import BGM from './components/BGM';
import { ChapterState } from './GameState';
interface IProps {
    state: ChapterState
}
export default function Stage(props: IProps) {
    const { state } = props;
    return <div>
        {state.bgmBase64Buff && state.bgmName && <BGM src={state.bgmBase64Buff} bgmName={state.bgmName} vol={100} />}
    </div>
}