import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import Widgets from './Widgets'
import AddField from './AddField'

export default class MyAwesomeReactComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      formValue: 'Untitled Form',
      selectedField: '',
      schema: {}
    }
  }

  onChangeForm = (value) => {

    this.setState({
      formValue: value,
    })
  }

  onChangeWidgets = (value) => {
    console.log('calling')
    this.setState({
      selectedField: value    
    })
  }

  addToSchema = (fieldName, field) => {

    this.state.schema[fieldName] = field 
    this.forceUpdate()
  }
  
  render() {

    let {formValue, selectedField, schema} = this.state

    return (
      <div className="container">
        <div className="header">
           <AppBar
            title="Schema Builder"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>
        <div className="body">
          <div className="widgets">
            <Widgets onChangeWidgets={this.onChangeWidgets}/>
          </div>
          <div className="formCont">
            <TextField
              floatingLabelText="Form Name"
              value={formValue}
              onChange={this.onChangeForm}
              fullWidth={true}
            />
            <div className="formFields">
              <AddField selectedField={selectedField} addToSchema={this.addToSchema} schema={schema}/> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}
