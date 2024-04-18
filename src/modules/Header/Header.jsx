import React from 'react'
import s from './header.module.css'
export  function Header() {
  return (
    <div className={s.header}>
      <h1 className={s.header__title}>Location</h1>
      <svg className={s.header__img} width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 9.33333C2 5.19567 5.41323 2 10 2C14.5868 2 18 5.19567 18 9.33333C18 10.0343 17.7062 11.1839 17.0488 12.7355C16.4146 14.2322 15.5292 15.9062 14.5465 17.5847C12.9854 20.2514 11.2354 22.8349 10 24.5885C8.76457 22.8349 7.01456 20.2514 5.45345 17.5847C4.47085 15.9062 3.58535 14.2322 2.95122 12.7355C2.29384 11.1839 2 10.0343 2 9.33333Z" stroke="white" stroke-width="4" stroke-linejoin="round" />
        <ellipse cx="10.0001" cy="10.0802" rx="3.33333" ry="3.36" fill="white" />
      </svg>
    </div>
  )
}
