import classNames from 'classnames';
import React, { useEffect } from 'react';
import styles from './style.module.css';
import CommonStyle from '../CommonStyle';
interface IProps {
    percent: number
    className?: string
}

export default function IProgressBar(props: IProps) {
    const [displayLength, setDisplayLength] = React.useState(0);
    useEffect(() => {
        setDisplayLength(props.percent);
    }, [props.percent])
    return <div
        className={classNames(
            styles.progress,
            styles.progressWrap,
            CommonStyle.BaseBackground)}
    >
        <div
            style={{ width: `${displayLength}%` }}
            className={classNames(styles.progress,
                styles.progressBar,
                CommonStyle.baseForeGround,
                CommonStyle.BaseBackground
            )}></div>
    </div>;
};