import React from 'react';
import chapter1 from '../../../scripts/titles/chapter1.jpg'
import chapter2 from '../../../scripts/titles/chapter2.jpg'
import chapter3 from '../../../scripts/titles/chapter3.jpg'

interface ImgMap {
    [key: string]: string
}
const imgMap: ImgMap = {
    chapter1, chapter2, chapter3
}

interface IProps {
    className: string;
    chapterName: string;
}
export default function Title(props: IProps) {
    return <div style={{ backgroundImage: `url(${imgMap[props.chapterName]})` }} className={`ark4Title fadeIn ${props.className}`}>
        title:{props.chapterName}
    </div>
}