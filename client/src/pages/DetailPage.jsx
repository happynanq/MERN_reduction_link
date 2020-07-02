import React, { useState, useCallback, useContext, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { Loader } from '../Components/Loader';
import { LinkCard } from '../Components/LinkCard';

export const DetailPage = ()=>{
  const [link, setLink] = useState()
  const {token}= useContext(AuthContext);
  const linkId = useParams().id
  const {request,loading}= useHttp()
  const getLink = useCallback(async()=>{
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization:"Bearer "+token
      })
      // console.log(fetched);
      setLink(fetched)
    } catch (e) {
      
    }
  },[token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink]);

  if(loading){
    return <Loader/>
  }


  return (
    <>
      {!loading && link && <LinkCard link={{...link}}/>}
    </>
  )
}
 