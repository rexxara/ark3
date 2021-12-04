import React, { useState } from 'react'
import '../style.css'
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
    DoubleLeftOutlined,
    SettingOutlined
} from '@ant-design/icons';

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
    toggleSetting: () => any,
    auto: boolean,
    displayName: string,
    rawLine: string,
    saveDataConOpen: boolean
    bgm: any
}
export default function CtrlPanel({ clickHandle, rawLine, displayName, saveDataConOpen, toggleSetting, linePointer, nextChapter, displaycharactersArray, toogleAuto, quickSave, quickLoad, closeSaveCon, openSaveCon, bgm, auto }: IProps) {
    const [open, setOpen] = useState<boolean>(false)
    const openHandle = () => {
        setOpen((state: boolean) => !state)
    }
    return (
        <div className='ctrlPanle' style={{ width: open ? '100vw' : undefined }}>
            {open && <React.Fragment>
                <Abutton  onClick={toogleAuto}>{auto ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</Abutton>
            </React.Fragment>}
            <span style={{ display: open ? 'inline-block' : 'none' }}>
                <Log rawLine={rawLine} displayName={displayName} />
            </span>
            {open && <>
                <Abutton  onClick={quickSave}><span><CloudDownloadOutlined /></span></Abutton>
                <Abutton  onClick={quickLoad}><CloudUploadOutlined /></Abutton>
                <Abutton 
                    onClick={saveDataConOpen ? closeSaveCon : openSaveCon}>
                    {saveDataConOpen ? <CloseSquareOutlined /> : <SaveOutlined />}</Abutton>
                <Abutton  onClick={() => window.history.back()}><RollbackOutlined /></Abutton>
                <Abutton  onClick={toggleSetting}><SettingOutlined /></Abutton>
            </>}
            <Abutton  onClick={openHandle}>{open ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}</Abutton>
        </div>
    );
}