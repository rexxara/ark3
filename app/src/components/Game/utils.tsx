
import { IState, IProps, iniState } from './gameTypes'
import { SaveData } from './actions'
import { Option } from '../../utils/types'

export  const saveDataAdapter = (newData: SaveData, props: IProps, state: IState) => {
    //cgCache
    //currentChapter(string)=>array //rawLine=displaytext//chooseKey=>choose//isNext=>choose
    const { data: { chapters,caches }, RawScript: { inputs, chooses } } = props
    const { background, cg, displaycharacters: oldCharater } = state
    const { currentChapterName, inputKey } = newData
    const loadedChapter = chapters.find(v => v.name === currentChapterName)
    console.log(props)
    if (loadedChapter) {
        console.log(loadedChapter)
        const loadedChapterCache=caches[loadedChapter.arkMark]
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
                bgms:[],
                ses:[],
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