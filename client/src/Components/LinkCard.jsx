import React from 'react';
export const LinkCard = ({link})=>{
  return (
    <>
      <h2>Ссылка</h2>
      <p>Ваша ссылка: <a href={link.link.to} target="_blank" rel="noopener noreferrer">{link.link.to}</a></p>
      <p>Откуда ссылка: <a href={link.link.from} target="_blank" rel="noopener noreferrer">{link.link.from}</a></p>
      <p>Количество кликов по ссылке: <strong>{link.link.clicks}</strong> </p>
      <p>Дата создания : <strong>{new Date(link.link.date).toLocaleDateString()}</strong></p>
    </>
  )
}