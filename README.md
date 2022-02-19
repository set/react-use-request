# react-use-request
useRequest Hook for React Hook projects.

Just add useRequest.js file to your project with copy and paste. It is not npm library.

Usage with Login Example
```
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAccessToken } from '../../store/auth';
import useRequest from '../../api';

function Login() {

  // Defines
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form models
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Prepare the request
  const loginRequest = useRequest('POST', 'login');

  // Send request when submit button click
  async function loginHandle() {
    const response = await loginRequest.send({
      data: {
        email,
        password,
      }
    });
    if( !response.status ) {
      console.log('error', response.data)
    }

    dispatch(setAccessToken(response.access_token));
    localStorage.setItem('access_token', response.access_token);
    navigate('/');
  }

  return (
    <div>
      Email: <br /><input type="text" value={email} onChange={d => setEmail(d.target.value)} /> <br /><br />
      Password: <br /><input type="password" value={password} onChange={d => setPassword(d.target.value)} /> <br />
      <button onClick={loginHandle}>Login</button>
    </div>
  )
}

export default Login
```
