import React from 'react';
import { NextHandle } from '../../Hooks/useCommandQueue';
import Background from './components/Background';
import BGM from './components/BGM/index';
import Charaters from './components/Charaters';
import useTextArea from './components/TextArea';
import { ChapterState } from './GameState';
import { useLatest } from 'react-use';
import { sleep } from '../../utils/utils';
interface IProps {
    state: ChapterState;
    skip: boolean;
    nextHandle: NextHandle;//todo 包一下 不然最终会越界
    auto: boolean;
}
export default function Stage(props: IProps) {
    const { state } = props;
    const _props = useLatest(props);
    const stageClick = () => {
        const skipSuccess = skipHandle();
        if (!skipSuccess) {//这行播放完毕
            props.nextHandle();
        }
    }
    const [TextArea, skipHandle] = useTextArea({
        text: state.textAreaContent,
        speaker: state.textAreaSpeaker,
        sound: state.textAreaSoundFilePath,
        skip: props.skip,
        id: state.commandId,
        centered: state.textAreaCenterd,
        onEnd: async (id) => {
            if (_props.current.auto) {
                await sleep(1000);
                props.nextHandle({ triggerByAuto: true })
            }
        }
    });
    return <div className='stageCon' onClick={stageClick}>
        {state.textAreaContent && TextArea}
        <Charaters charaters={state.charaters} speaker={state.textAreaSpeaker} speakerCenterd={state.speakerCenterd} />
        {state.bgBase64Buff && state.bgName && <Background src={state.bgBase64Buff} name={state.bgName} />}
        {state.bgmBase64Buff && state.bgmName && <BGM src={state.bgmBase64Buff} bgmName={state.bgmName} vol={100} />}
    </div>
}