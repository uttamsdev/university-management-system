import React, { ReactNode } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

type TFormProps = {
    onSubmit: SubmitHandler<any>;
    children: ReactNode
} & TFromConfig;

type TFromConfig = {
    defaultValues?: Record<string, any>
}
const PHFrom = ({ onSubmit, children, defaultValues }: TFormProps) => {
    const formConfig: TFromConfig = {};

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }
    const methods = useForm(formConfig)
    return (
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)} action="">
                {children}
            </form>
        </FormProvider>
    )
}

export default PHFrom