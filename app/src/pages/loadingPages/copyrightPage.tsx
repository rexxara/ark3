import React from 'react';
import Scence from '../../components/scence'
import cpri from '../../assets/copyright.jpg'
import { RouteComponentProps } from 'react-router'
import { Link } from 'dva/router'
import { imgStyle } from './computedStyle'
import { connect } from 'dva';
interface IProps{
  dispatch:any
}
class CopyrightPage extends React.Component<RouteComponentProps&IProps>{
  render() {
    const {dispatch}=this.props
    return (
      <Scence>
        <span onClick={()=>{
        dispatch({
            type: 'audio/playBgm',
            payload: 'theme'
        })
        }}>
          <Link to="/loginPage"><img src={cpri} style={imgStyle} alt="" /></Link>
        </span>
      </Scence>
    )
  }

}

export default connect((store: any) => {})(CopyrightPage)