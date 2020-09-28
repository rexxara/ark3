import React from 'react';
import Scence from '../../components/scence'
import cpri from '../../assets/copyright.jpg'
import { RouteComponentProps } from 'react-router'
import { Link } from 'dva/router'
import { imgStyle } from './computedStyle'

class CopyrightPage extends React.Component<RouteComponentProps>{
  render() {
    return (
      <Scence>
        <Link to="/loginPage"><img src={cpri} style={imgStyle} alt="" /></Link>
      </Scence>
    )
  }

}

export default CopyrightPage