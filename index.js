import React, {PropTypes} from "react"
import history from "./../history"
import dependencies from "./dependencies"
import ReactDOM from "react-dom"

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
      this.state.current.push(c)
    } else if (c == null || c.action==="POP") {
      this.state.current.pop()
    }
    var history = this.state.history,
      pages = this.state.pages,
      l = history.length,
      pathname = this.state.current[this.state.current.length - 1].pathname,
      position = "center"
    console.log(c)
    if (l === 0 && c != null) {
      history.push(pathname)
    } else if (c == null || c.action==="POP") {
      history.pop()
      position = "left"
    } else {
      history.push(pathname)
      position = "right"
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
  mixins: [Layout, PageSlider],
  componentDidMount() {
    history.listen(this.historyListener)
  },
  componentWillUnmount() {
    history.unlisten(this.historyListener)
  },
  componentWillReceiveProps(nextProps) {
    console.log("receive")
    this.slidePage(nextProps.children, this.current)
    this.current = null
  },
  historyListener(current) {
    if (current.action !== "POP" || this.current === undefined) {
      this.current = current
    }
  }
})

export default IonView
