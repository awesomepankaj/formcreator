import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SubHeader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import keycode from 'keycode'

import config from '../config'

let initialState = {
  fieldName: '',
  fieldType: '',
  options: [],
  optionVal: '',
  fieldLabel: '',
  labels: [],
  openLanguageSelector: false,
  defaultValue: ''
}

export default class Select extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = initialState  
  }

  handleFieldName = (e, value) => {

    this.setState({
      fieldName: value    
    })
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

  handleDefaultValueChange = (event, value) => {
    
    this.setState({
      defaultValue: value
    })
  }

  handleOptionVal = (e, value) => {
    
    this.setState({
      optionVal: value
    })
  }

  handleAddOption = () => {
    this.addOption()  
  }

  addOption = () => {

    this.state.options.push(this.state.optionVal)
    this.setState({
      optionVal: ''
    })
  }

  handleOptionValKeyDown = (e) => {
    
    if (keycode(e) === 'enter') {
      this.addOption() 
    }
  }

  handleCreate = () => {

    let field = {
      type: this.state.fieldType.value,
      options: this.state.options,
      defaultValue: this.state.defaultValue
    } 

    let fieldVal = _.reduce(this.state.labels, (result, value) => {

      result[value.language] = {label: value.value}
      return result 
    }, field)

    this.props.addToSchema(this.state.fieldName, fieldVal)
    this.state.labels.splice(0, this.state.labels.length)
    this.state.options.splice(0, this.state.options.length)
    this.setState(initialState)
  }

  selectFieldType = (event, index, value) => {
    
    this.setState({
      fieldType: value
    })
  }

  
  render() {
    let {fieldName, options, optionVal, fieldLabel, labels, openLanguageSelector, defaultValue, fieldType} = this.state
    let {fieldTypePath} = this.props
    
    return (
      <div className="fieldContainer"> 
        <TextField
          floatingLabelText='Field Name'
          style={{width: '100%'}}
          value={fieldName}
          onChange={this.handleFieldName}
        />
        <SelectField
          style={{width: '100%'}}
          value={fieldType}
          floatingLabelText='Field Type'
          onChange={this.selectFieldType}
        > 
          {config[fieldTypePath].map((type, i) => {

            return <MenuItem key={i} value={type} primaryText={type.label}/>
          })} 
        </SelectField>

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
        <p>Options</p>
        <List>
          {options.map((option, i) => {
            let optionVal = (i + 1) + ') ' + option 
            return <ListItem primaryText={optionVal} key={i}/>
          })}
        </List>
        <div className="addOptions">
          <TextField
            style={{width: '80%'}}
            floatingLabelText='Add Options'
            value={optionVal}
            onChange={this.handleOptionVal}
            onKeyDown={this.handleOptionValKeyDown}
          />
          <RaisedButton 
            style={{width: '10%', marginLeft: 50}}
            label="Add"
            onTouchTap={this.handleAddOption}
          />
        </div>
        <TextField
          style={{width: '100%'}}
          floatingLabelText='Default Value' 
          value={defaultValue}
          onChange={this.handleDefaultValueChange}
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
