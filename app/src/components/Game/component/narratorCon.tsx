import React from 'react'
import '../style.css'
import { CSSTransition } from 'react-transition-group'
import { vh, vw } from '../../../utils/getSize';

interface IProps {
    narratorMode: string[] | undefined,
    displayText: string
}
interface IState {
    in: boolean,
    narratorMode: string[] | undefined,
    displayText: string
}
class App extends React.Component<IProps>{
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        const { narratorMode, displayText } = nextProps;
        if (narratorMode && prevState.narratorMode && narratorMode.length > 1) {
            if (narratorMode.length > prevState.narratorMode.length) {
                const narrator = document.getElementById('narrator')
                if (narrator) {
                    setTimeout(() => {
                        narrator.scrollTop = narrator.scrollHeight
                    }, 0);
                } else {
                    throw new Error("narrator container not found")
                }
            }
        }
        if (Array.isArray(narratorMode)) {
            return { in: true, displayText, narratorMode }
        } else {
            if (prevState.in) {
                return { in: false }
            }
        }
        return null
    }
    state = {
        in: false,
        narratorMode: [],
        displayText: ''
    }
    render() {
        const { narratorMode, displayText } = this.state
        return <CSSTransition
            in={this.state.in}
            timeout={1000}
            classNames={{
                enter: 'animate__animated',
                enterActive: 'animate__fadeIn',
                exit: 'animate__animated',
                exitActive: 'animate__fadeOut'
            }}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            {narratorMode ? <div className={'narrator'} id="narrator" style={{ marginLeft: vw(10), marginTop: vh(10), maxWidth: vw(80), height: vh(80) }}>{
                narratorMode.map((v, i) => {
                    return <p className={'narratorLine'} key={i}>{v}</p>
                })}
                <p className={'narratorLine'}>{displayText}</p>
            </div> : <div ></div>}
        </CSSTransition>
    }
}
export default App