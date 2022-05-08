import React from 'react'
interface IProps {
    src: string;
    name: string;
}
export default function BGM(props: IProps) {
    const { src, name } = props;
    if (src.length < 1) {
        return <div></div>
    }
    return <div id="ARKBG" className='ARKBG' style={{ backgroundImage: `url(${src})`}}>
    </div>
}