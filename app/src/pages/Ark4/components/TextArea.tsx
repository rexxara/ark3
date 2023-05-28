import { StepForwardOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useLatest } from 'react-use';

interface IProps {
    text?: string;
    speaker?: string;
    skip?: boolean;
}
export default function useTextArea(props: IProps) {
    const text = props.text || '';
    const [index, setIndex] = useState<number | undefined>(0);
    const timer: any = React.useRef();
    const _skip = useLatest(props.skip);
    useEffect(() => {
        if (_skip.current) {
            if (props.text) {
                setIndex(props.text.length - 1);
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
        }

    })
    const skipHandle = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current)
            setIndex(undefined);
            timer.current = undefined;
            return true;
        }
        return false;
    }, [])
    const displayText = typeof index === 'number' ? text.slice(0, index) : props.text
    return [<div className='textarea'>
        <div className='nameCon'>{props.speaker}</div>
        <div className='textCon'>
            {displayText} {props.text?.length === displayText?.length && <StepForwardOutlined className='nextIcon' />}
        </div>
    </div>, skipHandle] as const;
}
//{this.state.displayText}{rawLine === displayText && rawLine.length > 0 && 