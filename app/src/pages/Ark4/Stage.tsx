import React from 'react';
import { NextHandle, NextHandleOption } from '../../Hooks/useCommandQueue';
import Background from './components/Background';
import BGM from './components/BGM/index';
import Charaters from './components/Charaters';
import useTextArea from './components/TextArea';
import { ChapterState } from './GameState';
import { useLatest } from 'react-use';
import { sleep } from '../../utils/utils';
import { connect } from 'dva';
import ChooseRender from './components/ChooseRender';
interface IProps {
    audio: any;
    state: ChapterState;
    skip: boolean;
    nextHandle: NextHandle;//todo 包一下 不然最终会越界
    auto: boolean;
}
function Stage(props: IProps) {
    const { state } = props;
    const _props = useLatest(props);
    const stageClick = () => {
        const skipSuccess = skipHandle();
        if (!skipSuccess) {//这行播放完毕
            nexHandleWrapper({ triggerByAuto: false });
        }
    }
    const [TextArea, skipHandle, setIndex] = useTextArea({
        text: state.textAreaContent,
        speaker: state.textAreaSpeaker,
        sound: state.textAreaSoundFilePath,
        skip: props.skip,
        id: state.commandId,
        centered: state.textAreaCenterd,
        charaterVol: props.audio.chVol,
        onEnd: async (id) => {
            if (_props.current.auto) {
                await sleep(1000);
                nexHandleWrapper({ triggerByAuto: true });
            }
        }
    });
    return <div className='stageCon' onClick={stageClick}>
        {state.currentChoose.length ? <ChooseRender nextHandle={nexHandleWrapper} choose={state.currentChoose} /> : ''}
        {state.textAreaContent && TextArea}
        <Charaters charaters={state.charaters} speaker={state.textAreaSpeaker} speakerCenterd={state.speakerCenterd} />
        {state.bgBase64Buff && state.bgName && <Background src={state.bgBase64Buff} name={state.bgName} />}
        {state.bgmBase64Buff && state.bgmName && <BGM src={state.bgmBase64Buff} bgmName={state.bgmName} vol={100} />}
    </div>

    function nexHandleWrapper(param: Partial<NextHandleOption>) {
        props.nextHandle(param);
        setIndex(0);//不然会有画面闪烁//todo 优化
    }
}
export default connect((store: any) => store)(Stage)