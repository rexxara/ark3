import React, { useEffect, useState } from 'react';
import useVisiableToggle from '../../Hooks/useAnimateModel/useVisiableToggle';
import { LoadedChapterModel3 } from '../../utils/types';
import { loadChapterHandle } from './commandHandle/loadChapterHandle';
import Title from './components/Title';
import { DataContext } from './context/dataContext';
import { ChapterState, GameState, getInitChapterState } from './GameState';
import SectionProcessor from './SectionProcessor';
import { Ark4Helper } from '../../utils/ArkHelper';
import StateHelper from './components/StateHelper';

interface IProps {
    gameState: GameState
}
export default function Ark4Game(props: IProps) {
    const { context, dispatch } = React.useContext(DataContext);
    const { chapters } = context.data;
    const [currentChapterName, setCurrentChapterName] = useState<string>();
    const [currentSectionName, setCurrentSectionName] = useState<string>();
    const [currentChapterState, setCurrentChapterState] = useState<ChapterState>(getInitChapterState);
    const [
        animatedChapterName,
        titleclassName,
        showTitle,
        hideTitle
    ] = useVisiableToggle<string>(undefined);
    useEffect(() => {
        setCurrentChapterState(getInitChapterState());
    }, [currentChapterName])
    useEffect(() => {
        StateHelper.saveState(props.gameState)
        nextHandle();
    }, [])
    const nextHandle = async (chapterState?: ChapterState) => {
        const chapterName: string | undefined = await getChapterName();

        if (chapterName === undefined) {
            Ark4Helper.showReturnToTitleModal()
            return console.warn("gameOver");
        }

        const nextSection = chapters.find(v => v.name === chapterName);
        if (!nextSection) {
            Ark4Helper.showReturnToTitleModal();
            //throw new Error("next section not found ,please ensure the script");
            return console.warn("gameOver");
        }
        if (nextSection.arkMark !== currentChapterName && chapterName) {
            showTitle(chapterName);
            setCurrentSectionName(undefined);
            setCurrentChapterName(undefined);
            loadChapterHandle(chapterName).then(data => {
                setCurrentSectionName(nextSection.name);
                setCurrentChapterName(nextSection.arkMark);
                hideTitle();
            });
        }

        async function getChapterName() {
            let chapterName: string | undefined;
            if (!currentSectionName && !currentChapterName) {
                const startSection = chapters.find(v => v.isBegin);
                if (!startSection) {
                    throw new Error("begin chapter not found ,set a chapter isBegin to true");
                }
                chapterName = startSection.name;
            } else {
                const next = await getNextChapterName(currentSection, chapterState);
                chapterName = next;
            }
            return chapterName;
        }
    }
    const currentSection = chapters.find(v => v.name === currentSectionName);//模型里只有section
    return <>
        {animatedChapterName && <Title className={titleclassName} chapterName={animatedChapterName} />}
        {currentSection && <SectionProcessor nextHandle={nextHandle} currentSection={currentSection} state={currentChapterState} />}
    </>

}

function getNextChapterName(currentSection?: LoadedChapterModel3, chapterState?: ChapterState): Promise<string | undefined> {
    if (!currentSection || !chapterState) {
        return new Promise<string>(res => {
            res('')
        })
    }
    const { next, isEnd } = currentSection;
    if (isEnd) {
        return new Promise(res => {
            res(undefined)
        })
    }

    if (!next) {
        //章节回顾 
        //return this.reviewBack()
    }
    switch (typeof next) {
        case 'string':
            return new Promise<string>(res => {
                res(next)
            })
        case "object":
            return new Promise<string>(res => {
                res('选择')
            })
        case 'function':

            return new Promise<string>(res => {
                res(next(StateHelper.getLocalState()))
            })
        default:
        //理论上不存在
    }
    return new Promise<string>(res => {
        res('')
    })
}

