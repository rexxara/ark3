import React from 'react';
import { getCharacterStyle } from '../../../components/Game/utils';
import { DataContext } from '../context/dataContext';
import { Charaters } from '../GameState';
import classNames from 'classnames';

interface IProps {
    charaters: Charaters
    speaker?: string;
    speakerCenterd?: boolean;
}
export default function CharaterStage(props: IProps) {
    const { charaters } = props;
    const { context, dispatch } = React.useContext(DataContext);
    const displaycharactersArray = Object.keys(charaters);
    return <div className='displayCharactersCon'>
        {displaycharactersArray.map(name => {
            const style = getCharacterStyle(name, context.data.charaters);
            const centerd = props.speakerCenterd && props.speaker === name;
            //todo 单独一句话的样式 比如这句话站在中间说什么的
            const disable = props.speaker && props.speaker !== name;
            return <img alt={name} style={style}
                className={classNames(
                    'displayCharacter',
                    disable ? 'disableCharater' : "",
                    centerd ? 'hidedCharacter' : '')}
                key={name} src={charaters[name]} />
        })}
        {(props.speaker && props.speakerCenterd) ? <img alt={props.speaker} style={getCharacterStyle(props.speaker, context.data.charaters)}
            className={classNames('speakerCenterd')}
            src={charaters[props.speaker]} /> : ''}
    </div>
}