import * as React from 'react'
import SettingComp from '../components/Game/component/SettingComp'
import BackBtn from '../components/BackBtn'
const style: React.CSSProperties = {
    color: 'white'
}
const ConfigPage = () => {
    return <div style={style}>
        <SettingComp />
        <BackBtn/>
    </div>
}
export default ConfigPage