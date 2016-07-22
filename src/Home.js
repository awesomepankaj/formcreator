import React from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class MyAwesomeReactComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  render() {
    return (
      <div className="container">
        <div className="header">
           <AppBar
            title="Schema Builder"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>
      </div>
    )
  }
}
