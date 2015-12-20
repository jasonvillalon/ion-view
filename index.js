import React, {PropTypes} from "react"
import history from "./../history"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import dependencies from "./dependencies"

let {Layout} = dependencies

const IonView = React.createClass({
  mixins: [Layout],
  getInitialState: function() {
    return {
      direction: "right",
      paths: [],
      style: {},
      animatingCls: "",
      windowWidth: window.innerWidth
    }
  },
  onResize(dimention) {
    this.setState({
      windowWidth: dimention.innerWidth
    })
  },
  componentDidMount() {
    history.listen(this.historyListener)
  },
  componentWillUnmount() {
    history.unlisten(this.historyListener)
    console.log("unmounting")
  },
  historyListener(current) {
    console.log(current)
    if (current.action === "PUSH") {
      this.state.paths.push(current)
      this.state.direction = "right"
    } else if (current.action === "POP") {
      this.state.direction = "left"
      this.state.paths.splice(this.state.paths.length - 1, 1)
    }
    this.setState({
      paths: this.state.paths
    })
    this.setState({
      paths: this.state.paths,
      animatingCls: "",
      style: {
        transform: `translateX(${((this.state.windowWidth / 2) * (this.state.direction == "right" ? 1 : -1))}px) translateZ(0px)`
      }
    })
    setTimeout(() => {
      this.setState({
        animatingCls: " animating",
        style: {
          transform: "translateX(0px) translateZ(0px)"
        }
      })
    }, 100)
  },
  render() {
    return (
      <div className={"ion-view" + this.state.animatingCls} style={this.state.style} {...this.fill} {...this.flex()} {...this.layout("row")}>
        {this.props.children}
      </div>
    )
  }
})

export default IonView
