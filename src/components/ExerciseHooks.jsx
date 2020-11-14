import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './react-hook-form-components/input/FormInput'
import FormSelect from './react-hook-form-components/select/FormSelect'
import FormSelectAutoComplete from './react-hook-form-components/select-autocomplete'
import FormDatePicker from "./react-hook-form-components/datepicker";
import FormCheckbox from "./react-hook-form-components/checkbox";
import FormRadio from "./react-hook-form-components/radio";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {
  Typography,
  TextField,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import axios from 'axios'

const validationSchema = yup.object().shape({
  nameV: yup.string().required('Name Validation field is required'),
  selV: yup.string().required('Select Validation field is required'),
  selAutoV: yup.array().required('Multi Select Validation field required'),
  txtDateV: yup.date().typeError("Mui Date field must be a date").required("Mui Date field is required"),
})

const numberData = [
  {
    id: "10",
    label: "Ten",
  },
  {
    id: "20",
    label: "Twenty",
  },
  {
    id: "30",
    label: "Thirty",
  },
]

const radioGroupOptions = [
  {
    value: "female",
    label: "Female",
  },
  {
    value: "male",
    label: "Male",
  },
  {
    value: "other",
    label: "Other",
  },
];

const ExerciseHooks = (props) => { 
  const { register } = useForm()
  const methods = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { handleSubmit, errors } = methods;

  const [ formElements, setFormElements ] = useState({
    username: "",
    description: "",
    duration: "",
    date: "2019-01-01T10:30",
    users: []
  })

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => {
        if (res.data.length > 0) {
          setFormElements({
            ...formElements,
            users: res.data.map(user => user.username),
            username: res.data[0].username
          });
        }
      });
  }, [])

  const onChange = e => {
    setFormElements({
      ...formElements,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = data => {
    // axios
    //   .post("http://localhost:5000/exercises/add", data)
    //   .then(res => console.log(res.data))
    
    // window.location = "/"
    console.log(data)
  }



  return (
    <React.Fragment>
      <Typography>Enter Activity Details</Typography>
      <Divider style={{ margin: "20px opx" }} />
      <div style={{ padding: "10px" }}>
        <FormProvider {...methods}> 
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormInput name="username" label="Username" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="description" label="Description"  />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="duration" label="Duration" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="date" label="Date" value={formElements.date} />
              </Grid>
              <Grid item xs={6}>
                <FormSelect name="sel" label="Numbers" options={numberData} />
              </Grid>
              <Grid item xs={6}>
                <FormSelectAutoComplete name="selAuto" label="Auto Select Numbers" options={numberData} isMulti />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="nameV"
                  label="Name with Validation"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelect
                  name="selV"
                  label="Numbers with Validation"
                  options={numberData}
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <FormSelectAutoComplete
                  name="selAutoV"
                  label="Auto Select Numbers with Validation"
                  options={numberData}
                  isMulti
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <FormDatePicker name="txtDate" label="Mui Date" />
              </Grid>
              <Grid item xs={6}>
                <FormDatePicker
                  name="txtDateV"
                  label="Mui Date Validation"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6}>
                <FormCheckbox name="chk" label="Mui Checkbox" />
              </Grid>
              <Grid item xs={6}>
                <FormRadio
                  name="gender"
                  label="Gender"
                  options={radioGroupOptions}
                />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
        <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(onSubmit)}
        >
          SUBMIT
        </Button>
      </div>

      
    </React.Fragment>
  )

}

export default ExerciseHooks