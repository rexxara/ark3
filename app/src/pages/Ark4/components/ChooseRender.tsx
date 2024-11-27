import React from "react"
import { CurrentChoose } from "../GameState";
import { Modal } from "antd";
import Abutton from "../../../components/Abutton";
import { NextHandleOption } from "../../../Hooks/useCommandQueue";
import StateHelper from "./StateHelper";
interface IProps {
    choose: CurrentChoose[];
    nextHandle: (param: Partial<NextHandleOption>) => void
}
export default function ChooseRender(props: IProps) {

    const clickWrapper = (fn: Function) => {
        const state = StateHelper.getLocalState();
        const res = fn(state);
        StateHelper.saveState(res);
        props.nextHandle({ triggerByEndChooseCommand: true });
    }
    return <Modal bodyStyle={{ padding: '48px 0px 0px 0px', width: '500px' }} visible={true} footer={[]}>
        {props.choose.map(v => {
            return <Abutton style={{ width: '100%' }} key={v.text} onClick={() => clickWrapper(v.callback)}>{v.text}</Abutton>
        })}
    </Modal>
}