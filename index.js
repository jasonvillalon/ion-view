import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import _ from "lodash"

import dependencies from "./dependencies"

let {History, Card} = dependencies

const IonView = React.createClass({
  getInitialState() {
    return {
      history: [],
      pages: [],
      animating: false,
      current: []
    }
  },
  componentDidMount() {
    this.history = History.listen(this.historyListener)
  },
  componentWillUnmount() {
    this.history()
    this.unMount = true
  },
  componentWillReceiveProps(nextProps) {
    this.slidePage(nextProps.children, this.current)
    if (this.current !== undefined) {
      this.current = null
    }
  },
  historyListener(current) {
    if (this.unMount) return
    if (current.action !== "POP" || this.current === undefined) {
      this.current = current
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
      // if (page.props.history === false) {
      //   this.state.current.pop()
      // }
      this.state.current.push(c)
    } else if (c == null || c.action === "POP") {
      if (this.state.current.length > 1) {
        this.state.current.pop()
      }
    }
    let history = this.state.history,
      pages = this.state.pages,
      l = history.length,
      position = "center"
    if (_.findIndex(pages, page) !== -1) {
      return
    }
    // if (pages[pages.length - 1]) {
    //   if (pages[pages.length - 1].type.displayName === page.type.displayName) return
    // }
    if (l === 0 && c != null) {
      history.push(c.pathname)
    } else if (c == null || c.action === "POP") {
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
    pages.push(<Card className="page" position={position}>{React.cloneElement(page)}</Card>)
    this.setState({history: history, pages: pages, animating: position !== "center", current: this.state.current})
  },
  render() {
    return (
      <div {...this.props} className="ion-view">
        {this.state.pages}
      </div>
    )
  }
})

export default IonView
