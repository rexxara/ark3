import React from 'react';
import { getCharacterStyle } from '../../../components/Game/utils';
import { DataContext } from '../context/dataContext';
import { Charaters } from '../GameState';

interface IProps {
    charaters: Charaters
    speaker?: string;
}
export default function CharaterStage(props: IProps) {
    const { charaters } = props;
    const { context, dispatch } = React.useContext(DataContext);
    const displaycharactersArray = Object.keys(charaters);
    return <div className='displayCharactersCon'>
        {displaycharactersArray.map(name => {
            const style = getCharacterStyle(name, context.data.charaters);
            //todo 单独一句话的样式 比如这句话站在中间说什么的
            const disable = props.speaker && props.speaker !== name;
            return <img alt={name} style={style}
                className={`displayCharacter ${disable ? 'disableCharater' : ""}`}
                key={name} src={charaters[name]} />
        })}
    </div>
}