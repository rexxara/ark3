import * as React from 'react'
import SettingComp from './SettingComponent/SettingComp'
const style: React.CSSProperties = {
    position: "absolute",
    zIndex: 40,//先随便给一个
}
const settingCompWraper = () => {
    return <div style={style}><SettingComp></SettingComp></div>
}

export default settingCompWraper