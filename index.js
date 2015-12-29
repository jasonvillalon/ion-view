import React, {PropTypes} from "react"
import history from "./../history"
import dependencies from "./dependencies"
import ReactDOM from "react-dom"
import _ from "lodash"

let {Layout, WindowResize} = dependencies

var PageSlider = {
  getInitialState: function () {
    return {
      history: [],
      pages: [],
      animating: false,
      current: []
    }
  },
  componentDidUpdate: function() {
    var skippedCurrentFrame = false,
      pageEl = ReactDOM.findDOMNode(this).lastChild,
      pages = this.state.pages,
      l = pages.length,
      transitionEndHandler = function() {
        pageEl.removeEventListener("webkitTransitionEnd", transitionEndHandler)
        pages.shift()
        this.setState({pages: pages})
      }.bind(this),
      animate = function() {
        if (!skippedCurrentFrame) {
          skippedCurrentFrame = true
          requestAnimationFrame(animate)
        } else if (l > 0) {
          pages[l - 1] = React.cloneElement(pages[l - 1], {position: "center transition"})
          this.setState({pages: pages, animating: false})
          pageEl.addEventListener("webkitTransitionEnd", transitionEndHandler)
        }
      }.bind(this)
    if (this.state.animating) {
      requestAnimationFrame(animate)
    }
  },
  slidePage(page, c) {
    if (c) {
      if (c.action === "REPLACE") {
        return
      }
      if (this.state.current.length > 1) {
        let current = this.state.current[this.state.current.length - 1]
        if (current) {
          if (c.pathname === current.pathname) {
            return
          }
        }
      }
      this.state.current.push(c)
    } else if (c == null || c.action==="POP") {
      if (this.state.current.length > 1) {
        this.state.current.pop()
      }
    }
    var history = this.state.history,
      pages = this.state.pages,
      l = history.length,
      position = "center"
    if (_.findIndex(pages, page) !== -1) {
      return
    }
    if (l === 0 && c != null) {
      history.push(c.pathname)
    } else if (c == null || c.action==="POP") {
      history.pop()
      position = "left"
    } else {
      history.push(c.pathname)
      position = "right"
    }
    // remove unwanted page
    if (pages.length > 1) {
      pages.splice(0, 1)
    }
    pages.push(React.cloneElement(page, {position}))
    this.setState({history: history, pages: pages, animating: position!=="center", current: this.state.current})
  },
  render() {
    return (
      <div className="pageslider-container">
        {this.state.pages}
      </div>
    )
  }
}

const IonView = React.createClass({
  mixins: [PageSlider],
  componentDidMount() {
    history.listen(this.historyListener)
  },
  componentWillUnmount() {
    history.unlisten(this.historyListener)
  },
  componentWillReceiveProps(nextProps) {
    this.slidePage(nextProps.children, this.current)
    if (this.current !== undefined) {
      this.current = null
    }
  },
  historyListener(current) {
    if (current.action !== "POP" || this.current === undefined) {
      this.current = current
    }
  }
})

export default IonView
