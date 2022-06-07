import React from 'react';
import { NextHandle } from '../../Hooks/useCommandQueue';
import Background from './components/Background';
import BGM from './components/BGM';
import Charaters from './components/Charaters';
import useTextArea from './components/TextArea';
import { ChapterState } from './GameState';
interface IProps {
    state: ChapterState;
    nextHandle: NextHandle;//todo 包一下 不然最终会越界
}
export default function Stage(props: IProps) {
    const { state } = props;

    const stageClick = () => {
        const skipSuccess = skipHandle();
        if (!skipSuccess) {//这行播放完毕
            props.nextHandle();
        }
    }
    const [TextArea, skipHandle] = useTextArea({ text: state.textAreaContent, speaker: state.textAreaSpeaker });
    return <div onClick={stageClick}>
        {state.textAreaContent && TextArea}
        <Charaters charaters={state.charaters} speaker={state.textAreaSpeaker}/>
        {state.bgBase64Buff && state.bgName && <Background src={state.bgBase64Buff} name={state.bgName} />}
        {state.bgmBase64Buff && state.bgmName && <BGM src={state.bgmBase64Buff} bgmName={state.bgmName} vol={100} />}
    </div>
}