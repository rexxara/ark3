import React from 'react';

interface IState {
  timer: number,
  autoplay: boolean | undefined
}

interface IProps { }

export default class imageSlider extends React.Component<IProps, IState> {
  state: IState = {
    timer: 0,
    autoplay: true
  }

  render() {
    return <div>imgSlider</div>
  }
}

