import { Button, Row } from 'antd';
import React from 'react'
import { FieldValues, useForm, useFormContext } from 'react-hook-form'
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/features/hooks/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHFrom from '../components/form/PHFrom';
import PHInput from '../components/form/PHInput';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: 'A-0001',
  //     password: 'admin123'
  //   }
  // });

  const defaultValues = {
    userId: 'A-0001',
    password: 'admin123'
  }
  const [login, { data, isError, isLoading, isSuccess }] = useLoginMutation()

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Loaggin in');

    const userInfo = {
      id: data?.userId,
      password: data?.password
    }
    try {
      const res = await login(userInfo).unwrap(); //res.data.data.accessToken petam .unwrap dile direct data ta pabo
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }))
      toast.success('Logged In', { id: toastId, duration: 2000 }) //!loading ta cole jabe toast success hole same toast e 
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId, duration: 2000 },)
    }

  }

  console.log('data', data)
  return (
    <Row justify="center" align={'middle'} style={{ height: '100vh', width: '100vw' }}>
      <PHFrom onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name='userId' label='ID:' />
        <PHInput type='text' name='password' label='Password: ' />
        <Button htmlType='submit' loading={isLoading ? true : false}>Login</Button>
      </PHFrom>
    </Row>
  )
}

export default Login