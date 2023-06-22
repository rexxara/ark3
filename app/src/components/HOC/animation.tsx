import React from 'react'
import { CSSTransition } from 'react-transition-group'

export interface WithAnimationProps {
  cssAnimationEnd: boolean
}
export default function wrapAnimation(WrappedComponent: any): any {

  return class extends React.Component {
    state = {
      cssAnimationEnd: false
    }
    render() {
      const { match } = this.props as any
      return (
        <CSSTransition
          in={match !== null}
          classNames={{
            enter: 'animate__animated',
            enterActive: 'animate__bounceInLeft',
            exit: 'animate__animated',
            exitActive: 'animate__bounceOutRight'
          }}
          timeout={1000}
          mountOnEnter={true}
          unmountOnExit={true}
          onEntered={() => {
            this.setState({ cssAnimationEnd: true })
          }}
        >
          <WrappedComponent cssAnimationEnd={this.state.cssAnimationEnd} {...this.props} />
        </CSSTransition>
      )
    }
  }
}
