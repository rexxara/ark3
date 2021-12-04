
import { IState, IProps, iniState } from './gameTypes'
import { SaveData } from './actions'
import { ChapterCaches, Characters, Option } from '../../utils/types'

export const saveDataAdapter = (newData: SaveData, props: IProps, state: IState) => {
    //cgCache
    //currentChapter(string)=>array //rawLine=displaytext//chooseKey=>choose//isNext=>choose
    const { data: { chapters, caches }, RawScript: { inputs, chooses } } = props
    const { background, cg, displaycharacters: oldCharater } = state
    const { currentChapterName, inputKey } = newData
    const loadedChapter = chapters.find(v => v.name === currentChapterName)
    console.log(props)
    if (loadedChapter) {
        console.log(loadedChapter)
        const loadedChapterCache = caches[loadedChapter.arkMark]
        let choose: Option[] = []
        if (newData.chooseKey) {
            choose = chooses[newData.chooseKey]
            delete newData.chooseKey
        }
        if (newData.isNextChoose && Array.isArray(loadedChapter.next)) {
            choose = loadedChapter.next
        }
        let skipResourseCount = 0
        const { displaycharacters } = newData
        if (newData.background.length && newData.background !== background) skipResourseCount++
        if (newData.cg.length && newData.cg !== cg) skipResourseCount++
        skipResourseCount += Object.keys(displaycharacters).filter(key => {
            const oldEmo = (oldCharater[key] || {}).emotion
            const newEmo = displaycharacters[key].emotion
            if (oldEmo === newEmo) {
                return false
            } else if (newEmo.length) {
                return true
            } else {
                return false
            }
        }).length
        const rawLine = newData.displayText
        const mergedData = {
            ...iniState,
            ...newData,
            rawLine,
            choose,
            input: inputKey ? inputs[inputKey] : iniState.input,
            currentChapter: loadedChapter,
            skipResourseCount: skipResourseCount,
            audioCaches: {
                bgms: [],
                ses: [],
                // bgms: Object.values(loadedChapterCache.preLoadBgms),
                // ses: Object.values(loadedChapterCache.preloadSoundEffects),
                cgs: Object.values(loadedChapterCache.preLoadCgs)
            }
        }
        return mergedData
    } else {
        console.warn('save_data_Broken')
    }
}


export function getCharacterStyle(name: string, characters: Characters): React.CSSProperties {
    const character = characters[name];
    const style = character.style;
    return style || {};
}

export const CenterCss: React.CSSProperties = {
    width: '50vw',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
}
export interface DisplayLineDetail {
    _value: string;
    style: React.CSSProperties,
    soundSrc: string;
};
export const displayLineParser = (value: string): DisplayLineDetail => {
    const res = displayLineParserInner(value);
    const { style, soundSrc } = getDetailFromDisplayLineCommands(res.commands);
    return {
        _value: res.value,
        style: style,
        soundSrc: soundSrc
    }
}
const displayLineParserInner = (value: string, command?: string[]): { value: string, commands: string[] } => {
    const preCommands = command || [];
    const actionReg = /(\[.*?\])/;
    const matchRes = value.match(actionReg);
    if (matchRes && matchRes[0]) {
        const matchCommand = matchRes[0];
        const restStringPre = value.slice(0, matchRes.index);
        const restStringAfter = value.slice((matchRes.index || 0) + matchCommand.length);
        return displayLineParserInner(restStringPre + restStringAfter, [...preCommands, matchCommand.replaceAll('[', '').replaceAll(']', '')])
    } else {
        return { value: value, commands: preCommands }
    }
};
const DisplayLineCommand = {
    centerd: 'centerd',
    line: 'Line=',
}
const getDetailFromDisplayLineCommands = (commands: string[]) => {
    let style = {}
    let soundSrc = '';
    const srcRegA = /(\'.*?\')/;
    const srcRegB = /(\".*?\")/;
    commands.forEach(v => {
        if (v === DisplayLineCommand.centerd) {
            style = CenterCss;
        } else if (v.indexOf(DisplayLineCommand.line) >= 0) {
            const matchResA = v.match(srcRegA);
            const matchResB = v.match(srcRegB);
            const matchRes = matchResA || matchResB;
            soundSrc = matchRes?.[0] || '';
        }
    })
    console.log(soundSrc)
    return {
        style: style,
        soundSrc: soundSrc.replaceAll('"', '').replaceAll("'", '')
    }
}