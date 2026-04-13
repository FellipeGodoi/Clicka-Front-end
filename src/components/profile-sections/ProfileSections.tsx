'use client'

import { ReactNode } from 'react'
import style from './style.module.css'

interface ProfileSectionProps {
  title: string
  action?: ReactNode
  children: ReactNode
}

const ProfileSection = ({ title, action, children }: ProfileSectionProps) => {
  return (
    <section className={style.card}>
      <div className={style.header}>
        <span className={style.title}>{title}</span>
        {action}
      </div>

      {children}
    </section>
  )
}

export default ProfileSection