import React, { useEffect, useState } from 'react';
import MainGame from '../components/Game'
import loader from '../utils/loader/index'
import './index.css'
import { GameModel3, RawScript } from '../utils/types'
import { SaveData } from '../components/Game/actions'
import { connect } from 'dva'
import { globalState } from '../models/global';
import { AudioState } from '../models/audio';
interface IProps {
  global: {
    RawScript: RawScript,
    isReview: boolean,
    LoadDataFromLoadPage: SaveData
  } & globalState
  audio: AudioState
}
export const modRs = async (rs: RawScript): Promise<RawScript> => {
  if (rs.loaded) { return rs }
  const { chapters } = rs
  type Pro = {
    p: Promise<string>
    k: string,
    index: number
  }
  let promises: Pro[] = []
  Object.keys(chapters).map(key => {
    const chapter = chapters[key]
    chapter.map(async (sec, index) => {
      promises.push({ p: fetch(sec.script).then((r) => r.text()), k: key, index: index })
    })
  })
  await Promise.all(promises.map(v => v.p)).then(arr => {
    arr.map((loadedString, index) => {
      const item = promises[index]
      rs.chapters[item.k][item.index].script = loadedString
    })
  })
  rs.loaded = true
  return rs
}
const PlayGround = (props: IProps) => {
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
  return <div className='App'>
    {data && <MainGame
      data={data}
      isReview={props.global.isReview}
      RawScript={rs as any}
      setting={props.audio}
      LoadDataFromLoadPage={props.global.LoadDataFromLoadPage}
    />}
  </div>
}

export default connect((store: any) => store)(PlayGround)