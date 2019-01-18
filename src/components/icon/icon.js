import React from 'react'

export default (props) => {
    return (
      <div onClick={ props.clickHandler } className={ props.style ? props.style : '' }>
        <i className={ props.icon }></i>
      </div>
    )
}
