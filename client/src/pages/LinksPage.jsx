import React from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { Loader } from '../Components/Loader';
import { LinksList } from '../Components/LinksList';
export const LinksPage = ()=>{
  const [links, setLinks] = useState([])
  const {loading, request}=useHttp()
  const {token} = useContext(AuthContext);
  
  const fetchLinks = useCallback(async()=>{
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization :"Bearer "+ token
      }) 
      setLinks(fetched)
      debugger
    } catch (e) {
      
    }
  },[token, request])

  useEffect(()=>{
    fetchLinks()
  }, [fetchLinks])

  if(loading){
    return <Loader/>
  }

  // console.log("Links",links);
  return (
    <>
      {!loading && <LinksList links={links}/>}
    </>
  )
}
 