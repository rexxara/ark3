import React, { useState } from 'react'
import  '../style.css'
import Abutton from '../../Abutton'
import {
    CloseSquareOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    RollbackOutlined,
    SaveOutlined,
    DoubleRightOutlined,
    DoubleLeftOutlined
} from '@ant-design/icons';

import { vw } from '../../../utils/getSize'
import Log from './Log'
interface IProps {
    clickHandle: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, any: any) => any,
    linePointer: number,
    nextChapter: () => any,
    displaycharactersArray: Array<{ name: string; emotion: string }>,
    toogleAuto: () => any,
    quickSave: () => any,
    quickLoad: () => any,
    openSaveCon: () => any,
    closeSaveCon: () => any,
    auto: boolean,
    displayName: string,
    rawLine: string,
    saveDataConOpen: boolean
    bgm:any
}
export default function CtrlPanel({ clickHandle, rawLine, displayName, saveDataConOpen, linePointer, nextChapter, displaycharactersArray, toogleAuto, quickSave, quickLoad, closeSaveCon, openSaveCon, bgm, auto }: IProps) {
    const [open, setOpen] = useState<boolean>(false)
    const openHandle = () => {
        setOpen((state: boolean) => !state)
    }
    return (
        <div className='ctrlPanle' style={{ width: open ? vw(100) : vw(10) }}>
            {/* <p>第<Abutton onClick={(ev) => clickHandle(ev, { reset: true })}>{linePointer}</Abutton>行</p> */}
            {/* <Abutton onClick={nextChapter}>下一章</Abutton> */}
            {/* <p>在场人物<span></span></p>
            <p>{displaycharactersArray.map(v => v.name)}</p> */}
            {open && <React.Fragment>
                <Abutton type='small' onClick={toogleAuto}>{auto ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</Abutton>
            </React.Fragment>}
            <span style={{ display: open ? 'inline-block' : 'none' }}>
                <Log rawLine={rawLine} displayName={displayName} />
            </span>
            {open && <>
                <Abutton type='small' onClick={quickSave}><span><CloudDownloadOutlined /></span></Abutton>
                <Abutton type='small' onClick={quickLoad}><CloudUploadOutlined /></Abutton>
                <Abutton type='small'
                    onClick={saveDataConOpen ? closeSaveCon : openSaveCon}>
                    {saveDataConOpen ? <CloseSquareOutlined /> : <SaveOutlined />}</Abutton>
                <Abutton type='small' onClick={() => window.history.back()}><RollbackOutlined /></Abutton>
            </>}
            <Abutton type='small' onClick={openHandle}>{open?<DoubleRightOutlined/>:<DoubleLeftOutlined/>}</Abutton>
        </div>
    );
}