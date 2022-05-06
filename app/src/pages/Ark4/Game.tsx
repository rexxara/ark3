import React, { useEffect, useState } from 'react';
import { GameModel3 } from '../../utils/types';
import { ChapterState, GameState, initChapterState } from './GameState';
import SectionProcessor from './SectionProcessor';

interface IProps {
    gameState: GameState
    data: GameModel3
}
export default function Ark4Game(props: IProps) {
    // const [chapter,setChapter]=useState<string>();
    const [currentChapterName, setCurrentChapterName] = useState<string>();
    const [currentSectionName, setCurrentSectionName] = useState<string>();
    const [currentChapterState, setCurrentChapterState] = useState<ChapterState>(initChapterState);
    const { chapters } = props.data;
    useEffect(()=>{
        setCurrentChapterState(initChapterState);
    },[currentChapterName])
    useEffect(() => {
        const startSection = chapters.find(v => v.isBegin);
        if (!startSection) {
            throw new Error("begin chapter not found ,set a chapter isBegin to true");
        }
        setCurrentSectionName(startSection.name);
    }, [])
    const currentSection = chapters.find(v => v.name === currentSectionName);
    return <>{currentSection?.line && <SectionProcessor line={currentSection.line} state={currentChapterState} />}</>

}