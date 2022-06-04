import React from 'react';
import Background from './components/Background';
import BGM from './components/BGM';
import Charaters from './components/Charaters';
import { ChapterState } from './GameState';
interface IProps {
    state: ChapterState
}
export default function Stage(props: IProps) {
    const { state } = props;
    return <div>
        <Charaters charaters={state.charaters}/>
        {state.bgBase64Buff && state.bgName && <Background src={state.bgBase64Buff} name={state.bgName} />}
        {state.bgmBase64Buff && state.bgmName && <BGM src={state.bgmBase64Buff} bgmName={state.bgmName} vol={100} />}
    </div>
}