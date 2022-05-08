import { connect } from "dva";
import React, { useEffect, useState } from "react";
import { INIT_SETTING, SaveData } from "../../components/Game/actions";
import { globalState } from "../../models/global";
import loader from "../../utils/loader";
import { GameModel3, RawScript } from "../../utils/types";
import { modRs } from "../MainGame";
import Game from "./Game";
import { initGameState } from "./GameState";
import './style.css'

interface IProps {
  global: {
    RawScript: RawScript,
    isReview: boolean,
    LoadDataFromLoadPage: SaveData
  } & globalState
  audio: typeof INIT_SETTING & { bgm: any }
}
 function Ark4(props:IProps) {
    const rs = props.global.RawScript
    const [data, setData] = useState<GameModel3>()
    useEffect(() => {
      modRs(rs).then(getData)
    }, [])
    const getData = (rs: RawScript) => {
      const data = loader(rs as any, true, true)
      if (data) {
        setData(data)
      }
    }
    return <>{data&&<Game gameState={initGameState} data={data} />}</>
}
export default connect((store: any) => store)(Ark4)
