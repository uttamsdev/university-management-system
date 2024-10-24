import { Input } from "antd"
import { Controller } from "react-hook-form"
//! react hook form with ant design

type TInputProps = {
    type: 'string',
    name: 'string',
    label?: 'string'
}
const PHInput = ({ type, name, label }: TInputProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            {label ? label : ''}
            <Controller
                name={name} //register
                render={({ field }) => (
                    <Input {...field} type={type} id={name} />
                )}
            />

        </div>
    )
}

export default PHInput