import * as React from 'react'
import Abutton from '../components/Abutton'
import _throttle from 'lodash/throttle'
const BackBtn = () => {
    const back=()=>{
        if(window.location.hash.indexOf('#/loginPage')>-1){
            console.log('prevent')
            return }
        window.history.back()
    }
    const back_debounced=_throttle(back, 2200,{trailing:false})
    return <Abutton onClick={back_debounced} >返回</Abutton>
}
export default BackBtn