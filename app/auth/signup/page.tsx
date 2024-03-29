'use client';

import React from "react";
import AuthFormContainer from "@components/AuthFormContainer";
import { Button, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { filterFormikErrors } from "@/app/utils/formikHelpers";

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function SignUp() {
  const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
        console.log(values);
    }
  });

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  const { name, email, password } = values;

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <Input crossOrigin='' name="name" label="Name" onChange={handleChange} onBlur={handleBlur} value={name} />
      <Input crossOrigin='' name="email" label="Email" onChange={handleChange} onBlur={handleBlur} value={email} />
      <Input crossOrigin='' name="password" label="Password" type="password" onChange={handleChange}  onBlur={handleBlur} value={password} />
      <Button placeholder='' type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}