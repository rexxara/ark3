import { StepForwardOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLatest } from 'react-use';
//@ts-ignore
import { Howl, Howler } from 'howler'

interface IProps {
    text?: string;
    speaker?: string;
    skip?: boolean;
    sound?: string;
    id?: string;
    onEnd?: (id?: string) => void;
}
export default function useTextArea(props: IProps) {
    const text = props.text || '';
    const [index, setIndex] = useState<number | undefined>(0);
    const timer: any = React.useRef();
    const _props = useLatest(props);
    useEffect(() => {
        if (_props.current.skip) {
            if (props.text) {
                setIndex(props.text.length - 1);
                audioPlayer.current?.unload();
            }
            return;
        }
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = undefined;
        }
        setIndex(0);
        timer.current = setInterval(() => {
            setIndex((index) => (index || 0) + 1);
        }, 50);
    }, [props.text])
    useLayoutEffect(() => {
        if (index === text.length) {
            clearInterval(timer.current)
            timer.current = undefined;
        }
    })
    const skipHandle = useCallback(() => {
        if (timer.current || _audioState.current === 'playing') {
            clearInterval(timer.current)
            setIndex(undefined);
            timer.current = undefined;
            return true;
        }
        return false;
    }, [])
    const audioPlayer = useRef<any>(null);
    const [audioState, setAudioState] = useState<'noaudio' | 'playing' | 'played'>('noaudio');
    const _audioState = useRef(audioState);
    useEffect(() => {
        if (props.sound?.length) {
            if (audioPlayer.current) {
                audioPlayer.current.unload();
            }
            audioPlayer.current = new Howl({
                src: ['lines/' + props.sound],
                html5: true
            });
            audioPlayer.current.play();
            audioPlayer.current.on('end', (ev: any) => {
                setAudioState('played');
            });
            setAudioState('playing');
        } else {
            setAudioState('noaudio');
        }
    }, [props.sound])
    const displayText = typeof index === 'number' ? text.slice(0, index) : props.text
    const linePlayed = props.text?.length === displayText?.length && ['noaudio', 'played'].includes(audioState);
    useEffect(() => {
        if (linePlayed) {
            props.onEnd?.(props.id);
        }
    }, [linePlayed]);
    return [<div className='textarea'>
        <div className='nameCon'>{props.speaker}</div>
        <div className='textCon'>
            {displayText} {linePlayed && <StepForwardOutlined className='nextIcon' />}
        </div>
    </div>, skipHandle] as const;
}