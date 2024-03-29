import React from 'react'
import { LINE_TYPE, DisplayLine, CommandLine, NO_IMG, DisplayCharacters, Option } from '../../utils/types'
import { back, variableLoader } from '../../utils/utils'
import classnames from 'classnames'
import { IState, IProps, iniState, clickHandleConfig, AudioCaches } from './gameTypes'
import NarratorCon from './component/narratorCon'
import './style.css'
import ARKBGMplayer from './component/BGMplayer'
import { commandProcess, actionReg } from '../../utils/loader/index'
import ARKOption from './Option'
import action, { SaveData } from './actions'
import SaveDataCon from './component/saveDataCon'
import ImgCache from './component/ImgCache'
import CtrlPanel from './component/ctrlPanel'
import { Modal } from 'antd';
import GAMEInput from './component/input'
import SoundEffectPlayer from './component/soundEffectPlayer'
import Title from './titles/Title'
import { displayLineParser, getCharacterStyle, saveDataAdapter } from './utils'
import CgContainer from './component/CgContainer'
import BackgroundCon from './component/BackgroundContainer'
import { commandLineHandle } from './functions'
import TextArea from './component/TextArea'
import { vh, vw } from '../../utils/getSize'
import SettingComp from './component/settingCompWraper'
import { ExclamationCircleOutlined } from '@ant-design/icons';
//@ts-ignore
import { Howl, Howler } from 'howler'
const effectCanvasId = 'effects'

class MainGame extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { ...iniState, gameVariables: props.RawScript.variables }
        this.clickHandle = this.clickHandle.bind(this)
        this.imgOnload = this.imgOnload.bind(this)
        this.commandLineProcess = this.commandLineProcess.bind(this)
        this.nextChapter = this.nextChapter.bind(this)
        this.reset = this.reset.bind(this)
        this.toogleAuto = this.toogleAuto.bind(this)
        this.displayLineProcess = this.displayLineProcess.bind(this)
        this.skipThisLine = this.skipThisLine.bind(this)
        this.start = this.start.bind(this)
        this.cgAndBackgroundOnload = this.cgAndBackgroundOnload.bind(this)
        this.startChapter = this.startChapter.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.execCommand = this.execCommand.bind(this)
        this.quickSave = this.quickSave.bind(this)
        this.load = this.load.bind(this)
        this.save = this.save.bind(this)
        this.closeSaveCon = this.closeSaveCon.bind(this)
        this.openSaveCon = this.openSaveCon.bind(this)
        this.onInputSubmit = this.onInputSubmit.bind(this)
        this.reviewBack = this.reviewBack.bind(this)
        this.soundCallback = this.soundCallback.bind(this)
        this.TitleCallback = this.TitleCallback.bind(this)
        this.lineEndHandle = this.lineEndHandle.bind(this)
        this.onCacheLoadProgress = this.onCacheLoadProgress.bind(this)
        this.soundEnd = this.soundEnd.bind(this)

    }
    quickSave() {
        action.save(this.state, 0)
    }
    save(param: number) {
        action.save(this.state, param)
    }
    openSaveCon() {
        this.skipThisLine()
        this.setState({ saveDataConOpen: true })
    }
    closeSaveCon() {
        this.setState({ saveDataConOpen: false })
    }
    async load(ev?: React.MouseEvent, savedata?: SaveData) {
        this.skipThisLine()
        this.commandLineProcess({ command: LINE_TYPE.COMMAND_REMOVE_EFFECT }, true)
        let newData = savedata || await action.load(0)
        if (newData) {
            const data = saveDataAdapter(newData, this.props, this.state)
            if (data) {
                if (data.effectKey.length) { this.commandLineProcess({ command: LINE_TYPE.COMMAND_SHOW_EFFECT, param: data.effectKey }, true) }
                this.setState(data)
            }
        } else { console.warn('noQuick load Data') }
    }
    componentDidMount() {
        const { LoadDataFromLoadPage } = this.props
        if (LoadDataFromLoadPage) {
            this.load(undefined, LoadDataFromLoadPage)
        } else {
            const { RawScript: { variables } } = this.props
            this.setState({ gameVariables: variables }, this.startChapter)
        }
    }
    startChapter(chapterKey?: string) {
        const { data: { chapters } } = this.props
        const { currentChapter: { arkMark } } = this.state
        this.setState({ stop: false })
        this.setState({ clickDisable: true })
        let chapter = undefined
        if (!chapterKey) {
            chapter = chapters.find(v => v.isBegin)
            console.info('chapter is undefined ,Auto start game from first chapter')
        } else {
            chapter = chapters.find(v => v.name === chapterKey)
        }
        if (chapter) {
            const { gameVariables } = this.state
            if (arkMark === chapter.arkMark) {//小节切换
                const { cg, displaycharacters, bgm, auto, background, effectKey, audioCaches } = this.state
                this.setState({
                    ...iniState, gameVariables, cg, displaycharacters, bgm, auto, audioCaches,
                    background, effectKey, linePointer: 0,
                    currentChapter: chapter, clickDisable: false
                })
                action.unlockScence(chapter.name)
                this.start(chapter.line[0])
            } else {
                //章节切换
                const tName = { chapterName: chapter.arkMark, sectionName: chapter.name, total: 0, loaded: 0 }
                this.setState({ TitleChapterName: { chapterName: '', sectionName: '', total: 0, loaded: 0 } }, () => {
                    this.commandLineProcess({ "command": LINE_TYPE.COMMAND_REMOVE_EFFECT }, true)
                    this.setState({ TitleChapterName: tName })
                })
            }
        } else {
            return this.reviewBack()
        }
    }
    skipThisLine() {
        const { currentChapter, linePointer } = this.state
        const line = currentChapter.line[linePointer]
        if (line) {//加载存档的时候调用这个函数是没有line的
            this.setState({ stop: false })
            if ('value' in line) {
                const { gameVariables } = this.state
                const res = variableLoader(line.value, gameVariables) as string
                const { _value, soundSrc } = displayLineParser(res);
                this.setState({ displayText: _value || '', rawLine: _value || '', textAreaStop: true })
            } else {
                this.setState({ textAreaStop: true })
            }
        }
    }
    lineEndHandle(bySkip: boolean): boolean {
        const { auto, lineSound } = this.state
        let result = true;
        if (!bySkip) {
            if (auto) {
                if (lineSound) {
                    const playing = lineSound.playing();
                    if (playing) {
                        result = false;
                    }
                }
            }
        }
        this.setState({ textAreaStop: true })
        return result;
    }
    soundEnd(...args: any[]) {
        const { lineSound, auto, textAreaStop } = this.state;
        console.log(auto, textAreaStop, this.state)
        if (lineSound) {
            lineSound.unload();
            this.setState({ lineSound: undefined })
            console.log(auto, textAreaStop)
            if (auto && textAreaStop) {
                this.clickHandle();
            }
        }
    }
    async displayLineProcess(line: DisplayLine) {
        const isNarratorMode = false || line.type === LINE_TYPE.narrator
        const { displayName, displaycharacters, gameVariables, narratorMode } = this.state
        const { name, emotion } = line
        let { value } = line
        value = variableLoader(value, gameVariables)
        const { _value, soundSrc } = displayLineParser(value);
        value = _value || '';
        if (soundSrc?.length) {
            if (this.state.lineSound) {
                const { lineSound } = this.state;
                lineSound.unload();
            }
            const lineSound = new Howl({
                src: ['lines/' + this.state.currentChapter.name + '/' + (soundSrc)],
                html5: true
            });
            lineSound.play();
            lineSound.on('end', this.soundEnd);
            this.setState({ lineSound: lineSound })
        }
        let needLoadNewCharater = false
        let needLoadNewEmotion = false
        if (name && emotion) {
            needLoadNewCharater = true
            const nextEmo = emotion === NO_IMG ? "" : emotion
            needLoadNewEmotion = nextEmo ? true : false
            let nextDisplay: DisplayCharacters = {}
            for (const key in displaycharacters) {
                if (displaycharacters.hasOwnProperty(key)) {
                    const element = displaycharacters[key]
                    const newStyle = element.style;
                    if (element.name === name) { needLoadNewCharater = false }
                    if (element.name === name && element.emotion === nextEmo) { needLoadNewEmotion = false }
                    nextDisplay[element.name] = element.name !== name ? element : { name, emotion: nextEmo, style: newStyle }
                }
            }
            if (needLoadNewCharater) { nextDisplay = { ...displaycharacters, [name]: { name, emotion: nextEmo } } }
            this.setState({ displaycharacters: nextDisplay })
        }
        if (isNarratorMode) {
            this.setState({ narratorMode: [...(narratorMode || []), value], displayText: "", textAreaStop: true })
        } else {
            this.setState({ narratorMode: undefined })
            if (needLoadNewEmotion) {
                this.setState({ cacheDisplayLineText: value, cacheDisplayLineName: name || '', clickDisable: true })
            } else {
                if (name !== displayName) {
                    this.setState({ displayName: name || '', rawLine: value, displayText: value, textAreaStop: false })
                } else {
                    this.setState({ rawLine: value, displayText: value, textAreaStop: false })
                    //上一句和这一句没换人
                }
            }
        }
    }
    toogleAuto() {
        const { auto } = this.state
        this.setState({ auto: !auto })
        if (!auto) {//要自动播放但是现在没在滚动
            this.clickHandle()
        }
    }
    reset() {
        this.setState(iniState)
        this.setState({ stop: false })
        this.startChapter()
    }
    reviewBack() {
        this.setState({ clickDisable: true })
        if (this.props.isReview) {
            setTimeout(() => {
                const { origin } = window.location
                window.location.href = origin + '#/ScenceReview'
            }, 2000)
            return 0
        } else { throw new Error('chapter Next Node Not Found') }
    }
    nextChapter() {
        const { currentChapter: { next, isEnd }, gameVariables } = this.state
        if (isEnd) {
            Modal.confirm({
                title: '游戏结束，回到主菜单？',
                icon: <ExclamationCircleOutlined />,
                content: '游戏结束，回到主菜单？',
                onOk() {
                    back();
                },
                onCancel() { },
            });
            return console.warn("gameOver")
        }
        if (!next) { return this.reviewBack() }
        switch (typeof next) {
            case 'string':
                return this.startChapter(next)
            case "object":
                return this.commandLineProcess({ "command": LINE_TYPE.COMMAND_SHOW_CHOOSE, "param": next })
            case 'function':
                return this.startChapter(next(gameVariables))
            default:
            //理论上不存在
        }
    }
    start(currentLine: (CommandLine | DisplayLine)) {
        if ('command' in currentLine) {
            this.commandLineProcess(currentLine as CommandLine)
        } else {
            this.displayLineProcess(currentLine as DisplayLine)
        }
    }
    commandLineProcess(command: CommandLine, dontSkip?: boolean) {//commandLine dontSkip是因为每一章开始的时候清特效，然后会跳一行导致每章第一行显示不出来
        const { background, displaycharacters, cg, effectref } = this.state
        const result = commandLineHandle(command, { background, displaycharacters, cg, effectref, effectCanvasId })
        const { needLoadImg, newParam, needStop, delayTime } = result
        if (delayTime) {
            setTimeout(() => {
                this.setState({ clickDisable: false }, () => { this.clickHandle() })
            }, delayTime)
        }
        if (needLoadImg) {
            this.setState({ ...newParam, clickDisable: true })
        } else if (!needStop) {
            this.setState(newParam, () => { if (!dontSkip) { this.clickHandle() } })
        } else if (needStop) {
            this.setState(newParam)
        }
    }
    imgOnload() {
        const { skipResourseCount } = this.state
        if (!skipResourseCount) {
            this.setState({ clickDisable: false })
        } else {
            this.setState((state) => { return { ...state, skipResourseCount: state.skipResourseCount - 1 } })
        }
        const { cacheDisplayLineName, cacheDisplayLineText } = this.state
        if (cacheDisplayLineName && cacheDisplayLineText) {
            this.setState({ displayName: cacheDisplayLineName, rawLine: cacheDisplayLineText, displayText: cacheDisplayLineText, textAreaStop: false })
        } else { this.clickHandle() }
    }
    cgAndBackgroundOnload() {
        const { skipResourseCount } = this.state
        if (!skipResourseCount) {
            this.setState({ clickDisable: false }, () => { this.clickHandle(undefined, { thro: 'config' } as any) })
        } else {
            this.setState((state) => { return { ...state, skipResourseCount: state.skipResourseCount - 1 } })
        }
    }
    onSelect(selectedOption: Option) {
        const { gameVariables } = this.state
        let newGameVariables = {}
        const { callback, jumpKey } = selectedOption
        if (callback) {
            newGameVariables = { ...gameVariables, ...callback(this.execCommand, gameVariables) }
        }
        if (jumpKey) {
            return this.startChapter(jumpKey)
        }
        this.setState({ gameVariables: newGameVariables, choose: [], clickDisable: false }, () => {
            this.clickHandle()
        })
    }
    onInputSubmit(value: string) {
        const { gameVariables, input } = this.state
        let newGameVariables: any = gameVariables
        if (input.key) {
            newGameVariables[input.key] = input.afterFix(value)
        } else {
            console.warn('input key is invalid')
        }
        this.setState({ gameVariables: newGameVariables, clickDisable: false, input: iniState.input }, () => {
            this.clickHandle()
        })
    }
    execCommand(commandString: string) {
        const isCommand = commandString.match(actionReg)
        const { backgrounds, charaters, BGMs, cgs, chooses, inputs, soundEffects } = this.props.RawScript
        if (isCommand) {
            const commandJSON = commandProcess(isCommand, backgrounds, charaters, BGMs, cgs, {}, {}, {}, {}, {}, chooses, inputs, soundEffects)
            this.commandLineProcess(commandJSON)
        } else {
            console.warn(commandString + 'unrecognized')
        }
    }
    clickHandle(ev?: React.MouseEvent, config?: clickHandleConfig) {
        const { skipResourseCount, auto, clickDisable, currentChapter, textAreaStop, linePointer } = this.state
        config = config || {}
        if (skipResourseCount) {//这块和imgOnLoad的逻辑有重复，不过没bug就先不改了,没个j8,到处都是bug//好像没bug..
            return
        }
        if (ev && clickDisable) {
            //不让点你还点，点的太快了
            return 0
        }
        if (ev) {//手动点击取消自动播放
            if (auto) this.setState({ auto: false })
        }
        if (currentChapter) {
            const currentLines = currentChapter.line
            if (textAreaStop) {//如果一行播放结束
                if (linePointer >= currentLines.length - 1) {//一章或者一节结束
                    return this.nextChapter()
                } else {
                    const nextLine = currentLines[linePointer + 1]
                    this.setState({ linePointer: linePointer + 1 })
                    this.start(nextLine)
                }
            } else {
                this.skipThisLine()//跳过动画
            }
        } else {
            console.warn('noChapter')
        }
    }
    soundCallback() {
        this.setState({ soundEffect: '' })
    }
    TitleCallback({ ses, bgms, cgs }: AudioCaches) {
        const { TitleChapterName, gameVariables } = this.state
        const { data: { chapters } } = this.props
        const chapter = chapters.find(v => v.name === TitleChapterName.sectionName)
        if (chapter) {
            this.setState({
                ...iniState, gameVariables,
                audioCaches: { ses, bgms, cgs },
                currentChapter: chapter, clickDisable: false,
            })
            action.unlockScence(chapter.name)
            const currentLine = chapter.line[0]
            this.start(currentLine)
        } else {
            //throw new Error('chapterNotFound')//游戏结束时和其他蜜汁情况会触发到这块的逻辑
            console.log('游戏结束时和其他蜜汁情况会触发到这块的逻辑,把缓存从小节改成章节吧')
        }
    }
    onCacheLoadProgress(total: number, loaded: number) {
        this.setState({ TitleChapterName: { ...this.state.TitleChapterName, total: total, loaded: loaded } })
    }
    toggleSetting = () => {
        this.setState({ settingVis: !this.state.settingVis })
    }
    render() {
        const { auto, background, displayName, displayText, linePointer, displaycharacters, bgm, cg, choose,
            gameVariables, saveDataConOpen, currentChapter, rawLine, input, soundEffect, TitleChapterName, audioCaches, narratorMode, textAreaStop } = this.state
        const { data: { caches } } = this.props
        const displaycharactersArray = Object.keys(displaycharacters).map(v => displaycharacters[v])
        return <div style={{ width: vw(100), height: vh(100), overflow: 'hidden' }}>
            <CtrlPanel toggleSetting={this.toggleSetting} clickHandle={(ev) => this.clickHandle(ev, { reset: true })}
                linePointer={linePointer} auto={auto}
                rawLine={rawLine}
                displayName={displayName}
                saveDataConOpen={saveDataConOpen} closeSaveCon={this.closeSaveCon}
                openSaveCon={this.openSaveCon} quickSave={this.quickSave}
                quickLoad={this.load}
                bgm={bgm}
                displaycharactersArray={displaycharactersArray} nextChapter={this.nextChapter}
                toogleAuto={this.toogleAuto} />
            <Title TitleChapterName={TitleChapterName} ></Title>
            {this.state.settingVis && <SettingComp></SettingComp>}
            <ARKBGMplayer vol={this.props.setting.bgmVol} cache={audioCaches.bgms} src={bgm} />
            <SoundEffectPlayer cache={audioCaches.ses} src={soundEffect} callback={this.soundCallback} />
            {input.key && <GAMEInput placeholder={displayText} clickCallback={this.onInputSubmit} />}
            {saveDataConOpen && <SaveDataCon saveData={this.save} loadData={this.load} />}
            <div className='container' style={{ width: vw(100), height: vh(100) }} onClick={this.clickHandle}>
                <NarratorCon narratorMode={narratorMode} displayText={displayText} />
                <div style={{ position: "absolute", height: vh(67) }} className={choose.length ? 'chooseCon' : undefined}>
                    {choose.map((v, k) => <ARKOption gameVariables={gameVariables} key={k} onClick={this.onSelect} v={v} choose={choose} />)}
                </div>
                <div className='displayCharactersCon'>
                    {displaycharactersArray.map(v => {
                        const style = getCharacterStyle(v.name, this.props.RawScript.charaters);
                        return v.emotion ? <img alt='' style={{ ...style, ...v.style }} onLoad={this.imgOnload}
                            className={displayName === v.name ? classnames('displayCharacter', 'active') : 'displayCharacter'}
                            key={v.name} src={require(`../../scripts/charatersImages/${v.name}/${v.emotion}`)} /> : <p key={v.name} />
                    })}
                </div>
                <CgContainer cgList={audioCaches.cgs} cg={cg} />
                <div className='effects' id={effectCanvasId}></div>
                {(!narratorMode && !TitleChapterName.chapterName) && <div className={'dialog'}>
                    <div className='owner' style={{ height: vh(8), lineHeight: vh(8), paddingLeft: vw(5), fontSize: vh(6) }}>{displayName}</div>
                    <TextArea lineEndHandle={this.lineEndHandle} clickHandle={this.clickHandle} textAreaStop={textAreaStop} rawLine={rawLine} auto={auto} ></TextArea>
                </div>}
                <BackgroundCon background={background} />
            </div>
            {background && <img className='hide' onLoad={this.cgAndBackgroundOnload} src={require(`../../scripts/backgrounds/${background}`)} alt="" />}
            {cg && <img className='hide' onLoad={this.cgAndBackgroundOnload} src={require(`../../scripts/CGs/${cg}`)} alt="" />}
            {(currentChapter.arkMark || TitleChapterName.chapterName) &&
                <ImgCache chapterName={TitleChapterName.chapterName} onProgress={this.onCacheLoadProgress} caches={caches[(TitleChapterName.chapterName || currentChapter.arkMark)]} callback={this.TitleCallback} />}
        </div>
    }
}
export default MainGame