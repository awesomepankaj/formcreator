import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import config from '../config'


let initialState = {
  openLanguageSelector: false,
  defaultChecked: false,
  labels: [],
  fieldName: ''
}

export default class CheckboxField extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = initialState  
  }

  showLanguageSelector = (e) => {

    this.setState({
      openLanguageSelector: true,
      anchorEl: e.target
    })
  }

  closeLanguageSelector = () => {

    this.setState({
      openLanguageSelector: false
    })
  }

  handleChange = (index, event, value) => {

    this.state.labels[index].value = value
    this.forceUpdate()
  }

  handleLanguageTouchTap = (event, menuItem, index) => {
    
    this.state.labels.push({language: menuItem.props.value, value: ''}) 

    this.setState({
      openLanguageSelector: false
    })
  }

  handleCreate = () => {

    let field = {
      defaultChecked: this.state.defaultChecked
    } 

    let fieldVal = _.reduce(this.state.labels, (result, value) => {

      result[value.language] = {label: value.value}
      return result 
    }, field)

    this.props.addToSchema(this.state.fieldName, fieldVal)
    this.state.labels.splice(0, this.state.labels.length)
    this.setState(initialState)
  }
  
  handleFieldName = (event, value) => {
    
    this.setState({
      fieldName: value
    })
  }

  handleDefaultChecked = (event, value) => {
    this.setState({
      defaultChecked: value
    })
  }
  
  render() {


    let {openLanguageSelector, anchorEl, labels, fieldName, defaultChecked} = this.state
    let checkBoxStyle = {marginTop: 16}

    return (
      <div className="fieldContainer">
        <TextField
          floatingLabelText='Field Name'
          style={{width: '100%'}}
          value={fieldName}
          onChange={this.handleFieldName}
          errorText='This is not contain any space and first letter should be in lowercase.'
        />
        <div style={{width: '100%', marginTop: 20}}>
          <RaisedButton
            onTouchTap={this.showLanguageSelector}
            label="Select Language for Label"
          />  
          <Popover
            open={openLanguageSelector}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.closeLanguageSelector}
          >
            <Menu
              onItemTouchTap={this.handleLanguageTouchTap}
            >
              {config.languages.map((language, i) => {

                return <MenuItem key={i} primaryText={_.capitalize(language)} value={language}/>
              })}
            </Menu>
          </Popover>
        </div>
        {labels.map((labelInfo, i) => {

          let hintText = _.capitalize(labelInfo.language) + ' Label'
          let value = labels[i].value
          return <TextField
            key={i}
            style={{width: '100%', marginTop: 10}}
            floatingLabelText={hintText} 
            onChange={this.handleChange.bind(null, i)}
            value={value}
          />
        })}  
        <Checkbox 
          label='Initial Checked'
          style={checkBoxStyle}
          checked={defaultChecked}
          onCheck={this.handleDefaultChecked}
        />
        <RaisedButton
          label="Create"
          onTouchTap={this.handleCreate}
          style={{width: '20%', marginTop: 16}}
        />
      </div>
    )
  } 
}
