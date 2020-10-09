import * as React from 'react'
import Abutton from '../components/Abutton'
const BackBtn = () => {
    const [clickAble, setClickAble] = React.useState(true)
    const back=()=>{
        if(clickAble){
            window.history.back()
            setClickAble(false)
        }else{
            console.log('false')
        }
    }
    return <Abutton onClick={back} >返回</Abutton>
}
export default BackBtn