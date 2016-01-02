# IonView

## Installation
``` shell
$ yo rinjs:install-component

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

You"re using the Atomic generator.
? git repository or relative path to /src/ git@github.com:jasonvillalon/ion-view.git
Cloning into 'ion-view'...
   create ../variables.styl
   create ../variables.js
   create ../components.styl
   create ../../atomic.json
 conflict settings.js
? Overwrite settings.js? overwrite this and all others
    force settings.js
    force dependencies.js
DONE
```
## Usage

``` javascript
import React, { PropTypes } from "react"

import dependencies from "./dependencies"

let {
  AtomicApp,
  IonView
} = dependencies
React.createClass({
  render() {
    try {
      return (
        <AtomicApp className="main">
          <IonView>
            {this.props.children}
          </IonView>
        </AtomicApp>
      )
    } catch (err) {
      console.log(err)
    }
  }
})
```
