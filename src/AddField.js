import React from 'react'
import _ from 'lodash'

export default class AddField extends React.Component {
  
  render() {

    let {selectedField} = this.props

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
            Starting 
          </div>)
        }
      </div>
    )
  }
}
