import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/auth.context';
export const AuthPage = ()=>{
  const auth = useContext(AuthContext)
  const {loading, error,request, clearError} = useHttp()
  const message=useMessage()
  const [form, setForm] = useState({
    email:"",
    password:""
  })

  const changeHandler = (event)=>{
    setForm({
      ...form, [event.target.name] : event.target.value
    })
  }
  const registerHandler = async(event)=>{
    try {
      const data = await request("./api/auth/register", "POST", {...form})
      message(data.message)
    } catch (e) {
      
    }
  }

  const loginHandler = async(event)=>{
    try {
      const data = await request("./api/auth/login", "POST", {...form})
      auth.login(data.token, data.userId)
      // message(data.message)
    } catch (e) {
      
    }
  }

  useEffect(() => {
    message(error)
    clearError()
  }, [error,message, clearError]);
  useEffect(()=>{
    window.M.updateTextFields()
  },[])
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center">Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>

            <div className="input-field ">
              <input 
                placeholder="Введите емаил" 
                id="email" 
                type="text" 
                name="email"
                className="validate yellow-input"
                value={form.email}

                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field ">
              <input 
                placeholder="Введите пароль" 
                id="password" 
                name="password"
                type="password" 
                onChange={changeHandler}
                value={form.password}
                className="validate yellow-input"

                />
              <label htmlFor="password">Password</label>
            </div>
            </div>
          </div>
          <div className="card-action">

            <button 
              className="btn yellow darken-4" 
              disabled={loading}
              onClick={loginHandler}
              style={{marginRight:10}}>
              Войти
            </button>

            <button 
              className="btn grey whiten-1 black-text" 
              disabled={loading}
              onClick={registerHandler}>
              Авторизация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
 