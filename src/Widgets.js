import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ShortText from 'material-ui/svg-icons/content/text-format';
import LongText from 'material-ui/svg-icons/editor/short-text';
import CheckBox from 'material-ui/svg-icons/toggle/check-box';
import ChoiceList from 'material-ui/svg-icons/action/list';
import Divider from 'material-ui/Divider';
import CloseForm from 'material-ui/svg-icons/navigation/close';
import ShowSchema from 'material-ui/svg-icons/action/open-with';
import Subheader from 'material-ui/Subheader';

let createWidgets = [
  {
    label: 'Short Text',
    iconType: 'shortText' 
  },
  {
    label: 'Long Text',
    iconType: 'longText'
  },
  {
    label: 'CheckBox',
    iconType: 'checkBox'
  },
  {
    label: 'Choice List',
    iconType: 'choiceList'
  },
  {
    label: 'Multiple Choice',
    iconType: 'multipleChoice'
  }
]

let operationalWidgets = [
  {
    label: 'Show Schema',
    iconType: 'showSchema'
  },
  {
    label: 'Reset Form',
    iconType: 'resetForm'
  }
]

export default class Widgets extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    let {onChangeWidgets} = this.props
    return (
      <div>
        <List>
          <Subheader>Widgets</Subheader>
          {createWidgets.map((widget, i) => {
            return <ListItem
              key={i}
              primaryText={widget.label} 
              leftIcon={getIcon(widget.iconType)} 
              onClick={onChangeWidgets.bind(null, widget.iconType)}
            />
          })}
        </List>
        <Divider />
        <List>
          {operationalWidgets.map((widget, i) => {
            return <ListItem 
              key={i}
              primaryText={widget.label} 
              leftIcon={getIcon(widget.iconType)} 
              onClick={onChangeWidgets.bind(null, widget.iconType)}
            />
          })}
        </List>
      </div>
    )
  }
}

const getIcon = (type) => {
  switch(type) {
    case 'shortText': return <ShortText />
    case 'longText': return <LongText />
    case 'checkBox': return <CheckBox />
    case 'choiceList': return <ChoiceList />
    case 'multipleChoice': return <ChoiceList />
    case 'showSchema': return <ShowSchema />
    case 'resetForm': return <CloseForm />
  }
}
