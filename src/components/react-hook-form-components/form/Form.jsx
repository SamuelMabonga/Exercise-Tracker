import React from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import Grid from '@material-ui/core/Grid'
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core";

export default function Form ({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  const onSubmit = () => {

  }

  return (
    <div style={{ padding: "10px" }}>
      <FormProvider {...methods}>
        <form>
          {React.Children.map(children, child => {
            return child.props.name
              ? <Grid container spacing={2}>
                  <Grid item xs={6}>
                    {React.createElement(child.type, {
                      ...{
                        ...child.props,
                        register: methods.register,
                        key: child.props.name
                      }
                    })}
                  </Grid>
                </Grid>
              : child
          })}
        </form>
      </FormProvider>
      <button 
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </button>
    </div>
  )
}