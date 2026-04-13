'use client'

import style from './style.module.css'

interface GridItem {
  label: string
  value: string
}

interface ProfileGridProps {
  items: GridItem[]
}

const ProfileGrid = ({ items }: ProfileGridProps) => {
  return (
    <div className={style.grid}>
      {items.map((item, index) => (
        <div key={index} className={style.attribute}>
          <span className={style.label}>{item.label}</span>
          <span className={style.value}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

export default ProfileGrid