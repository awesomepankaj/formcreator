import React from 'react'
import _ from 'lodash'

export default class ShowSchema extends React.Component {
  
  render() {
    let {schema} = this.props
    let schemaKeys = _.keys(schema)
    let stringSchema = JSON.stringify(schema, (key, value) => {
      if (typeof value === 'function') {
        return value.toString()
      } else {
        return value
      }
    }, 4)

    return (
      <div className="schemaContainer">
        <pre>{stringSchema}</pre>
      </div>
    ) 
  }
}
