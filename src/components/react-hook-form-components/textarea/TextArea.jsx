import React from 'react'

export default function TextArea({ register, name, ...rest }) {
  return (
    <input 
      name={name} 
      ref={register} 
      {...rest} 
    />
  )
}
