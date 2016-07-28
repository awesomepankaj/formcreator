import React from 'react'
import _ from 'lodash'

import ShortField from './formFields/ShortField'
import ShowSchema from './formFields/ShowSchema'
import SelectField from './formFields/Select'
import Checkbox from './formFields/CheckBox'

export default class AddField extends React.Component {
  
  render() {

    let {selectedField, addToSchema} = this.props

    return (
      <div className="AddFieldCont">
        {_.isEmpty(selectedField) ? 
          (<div className="defaultTextCont">
            <p className="defaultTitle">
              Ready?
            </p>
            <p className="defaultDescription">
              Start adding form fields by selecting widgets in the menu.
            </p>
          </div>)
         :
          (<div className="formFieldCont">
            {this.getSelectedFieldView()}
          </div>)
        }
      </div>
    )
  }

  getSelectedFieldView = () => {

    let {selectedField, addToSchema, schema} = this.props

    switch(selectedField) {
      case 'shortText': return <ShortField addToSchema={addToSchema}/>
      case 'showSchema': return <ShowSchema schema={schema}/>
      case 'choiceList': return <SelectField addToSchema={addToSchema} fieldTypePath='shortFieldTypes'/>
      case 'multipleChoice': return <SelectField addToSchema={addToSchema} fieldTypePath='multiFieldTypes'/>
      case 'checkBox': return <Checkbox addToSchema={addToSchema}/>
    }
  }
}

