import React from 'react';
import '../pages/index.css'
interface IProps { 
    onEnter?:Function
    onLeave?:Function
}
interface IState { 
}
export default class scence extends React.Component<IProps> {

  render() {

    return (
        <div className='scence'>
            {this.props.children}
        </div>
    );
  }
}

