import React, {PropTypes} from "react"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import StaticContainer from "react-static-container"

import dependencies from "./dependencies"

let {Layout} = dependencies

class RouteCSSTransitionGroup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      previousPathname: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ previousPathname: this.context.location.pathname })
    }
  }

  render() {
    const { children, ...props } = this.props
    const { previousPathname } = this.state

    return (
      <ReactCSSTransitionGroup {...props}>
        <StaticContainer
          key={previousPathname || this.context.location.pathname}
          shouldUpdate={!previousPathname}
        >
          {children}
        </StaticContainer>
      </ReactCSSTransitionGroup>
    )
  }

  componentDidUpdate() {
    if (this.state.previousPathname) {
      this.setState({ previousPathname: null })
    }
  }
}


RouteCSSTransitionGroup.contextTypes = {
  location: React.PropTypes.object
}

const IonView = React.createClass({
  mixins: [Layout],
  render() {
    return (
      <RouteCSSTransitionGroup {...this.layout("row")} {...this.flex()} {...this.fill} component="div" transitionName="moveUp" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <div className="ionview" {...this.flex()} {...this.fill}>
          {this.props.children}
        </div>
      </RouteCSSTransitionGroup>
    )
  }
})

export default IonView
