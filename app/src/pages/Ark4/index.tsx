import { connect } from "dva";
import React, { useEffect } from "react";
import { INIT_SETTING, SaveData } from "../../components/Game/actions";
import { globalState } from "../../models/global";
import loader from "../../utils/loader";
import { RawScript } from "../../utils/types";
import { modRs } from "../MainGame";
import { DataContext, KeywordsContextProvider } from "./context/dataContext";
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
function Ark4(props: IProps) {
  const rs = props.global.RawScript
  const { context, dispatch } = React.useContext(DataContext);
  useEffect(() => {
    modRs(rs).then(getData)
  }, [])
  const getData = (rs: RawScript) => {
    const data = loader(rs as any, true, true)
    if (data) {
      dispatch?.({ type: 'data', payload: data })
    }
  }
  return <>{context.loaded && <Game gameState={initGameState} />}</>
}


function Ark4Wraper(props: any) {
  return <KeywordsContextProvider>
    <Ark4 {...props} />
  </KeywordsContextProvider>
}
export default connect((store: any) => store)(Ark4Wraper)
