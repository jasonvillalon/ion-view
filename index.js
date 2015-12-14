import React, { PropTypes } from "react"

import dependencies from "./dependencies"

let {Layout} = dependencies

const IonView = React.createClass({
  mixins: [Layout],
  render() {
    return (
      <div className="ionview" {...this.flex()} {...this.fill}>
        {React.cloneElement(this.props.children, {key: this.props.path})}
      </div>
    )
  }
})

export default IonView
