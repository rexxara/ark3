import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import useVisiableToggle from '../../Hooks/useAnimateModel/useVisiableToggle';
import { GameModel3, LoadedChapterModel3 } from '../../utils/types';
import { loadChapterHandle } from './commandHandle/loadChapterHandle';
import Title from './components/Title';
import { ChapterState, GameState, initChapterState } from './GameState';
import SectionProcessor from './SectionProcessor';

interface IProps {
    gameState: GameState
    data: GameModel3
}
export default function Ark4Game(props: IProps) {
    const [currentChapterName, setCurrentChapterName] = useState<string>();
    const [currentSectionName, setCurrentSectionName] = useState<string>();
    const [currentChapterState, setCurrentChapterState] = useState<ChapterState>(initChapterState);
    const [
        animatedChapterName,
        titleclassName,
        showTitle,
        hideTitle
    ] = useVisiableToggle<string>(undefined);
    const { chapters } = props.data;
    console.log(props.data)
    useEffect(() => {
        setCurrentChapterState(initChapterState);

    }, [currentChapterName])
    useEffect(() => {
        nextHandle();
    }, [])
    const nextHandle = async (chapterState?: ChapterState) => {
        const chapterName: string | undefined = await getChapterName();

        if (chapterName === undefined) {
            Modal.confirm({
                title: '游戏结束，回到主菜单？',
                icon: <ExclamationCircleOutlined />,
                content: '游戏结束，回到主菜单？',
                onOk() {
                    // back();
                },
                onCancel() { },
            });
            return console.warn("gameOver")
        }

        const nextSection = chapters.find(v => v.name === chapterName);
        if (!nextSection) {
            throw new Error("next section not found ,please ensure the script");
        }
        if (nextSection.arkMark !== currentChapterName) {
            showTitle(chapterName);
            const res = await loadChapterHandle(chapterName);
        }
        setCurrentSectionName(nextSection.name);
        setCurrentChapterName(nextSection.arkMark);
        hideTitle();

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
                console.log('next', next);
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
                res(next(chapterState))
            })
        default:
        //理论上不存在
    }
    return new Promise<string>(res => {
        res('')
    })
}

