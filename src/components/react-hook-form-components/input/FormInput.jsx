import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'

export default function FormInput(props) {
  const { control } = useFormContext()
  const { name, label, value, register, required, errorobj } = props
  let isError = false
  let errorMessage = ''
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true 
    errorMessage = errorobj[name].message
  }
  return (
    <Controller
      as={TextField}
      name={name}
      label={label}
      value={value}
      control={control}
      defaultValue=''
      ref={register}
      fullWidth={true}
      InputLabelProps={{
        className: required ? "required-label" : "",
        required: required || false,
      }}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  )
}
