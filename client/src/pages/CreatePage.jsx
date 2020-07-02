import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
export const CreatePage = ()=>{
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {request}= useHttp()
  const [link, setLink] = useState("")
  const perssHandler = async(e)=>{
    if(e.key ==="Enter"){
      try {
        const data = await request("/api/link/generate", "POST", {from:link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push("/detail/" + data.link._id)
        // console.log(data);
      } catch (error) {
        
      }
    }
  }
  useEffect(() => {
    window.M.updateTextFields()
  }, []);
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop:"2rem"}}>
      <div className="input-field ">
        <input 
          placeholder="Вставьте ссылку" 
          id="link" 
          type="text" 
          name="email"
          value={link}
          onChange={e=>setLink(e.target.value)}
          onKeyPress={perssHandler}
        />
        <label htmlFor="link">Введите ссылку</label>
      </div>
      </div>
    </div>
  )
}
 