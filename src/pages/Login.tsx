import { Button } from 'antd';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/features/hooks/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: 'A-0001',
      password: 'admin123'
    }
  });
  const [login, { data, isError, isLoading, isSuccess }] = useLoginMutation()

  const onSubmit = async (data : FieldValues) => {
    const toastId = toast.loading('Loaggin in');

    const userInfo = {
      id: data?.id,
      password: data?.password
    }
    try {
      const res = await login(userInfo).unwrap(); //res.data.data.accessToken petam .unwrap dile direct data ta pabo
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }))
      toast.success('Logged In', {id: toastId, duration: 2000}) //!loading ta cole jabe toast success hole same toast e 
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error('Something went wrong.', {id: toastId, duration: 2000},)
    }

  }

  console.log('data', data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id='id' {...register('id')} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id='password' {...register('password')} />
      </div>
      <Button htmlType='submit' loading={isLoading ? true : false}>Login</Button>
    </form>
  )
}

export default Login