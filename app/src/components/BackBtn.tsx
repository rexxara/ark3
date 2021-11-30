import * as React from 'react'
import Abutton from '../components/Abutton'
import { back } from '../utils/utils'
const BackBtn = () => {
    return <Abutton onClick={back} >返回</Abutton>
}
export default BackBtn