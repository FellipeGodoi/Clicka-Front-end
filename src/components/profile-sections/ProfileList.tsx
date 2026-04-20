'use client'

import style from './style.module.css'

interface ProfileListItem {
  id: string
  label: string
  onClick?: () => void
}

interface ProfileListProps {
  items?: ProfileListItem[]
  isEmptyMessage?: string
}

const ProfileList = ({ items, isEmptyMessage = "Nenhum item encontrado" }: ProfileListProps) => {
  if (!items || items.length === 0) {
    return <span className={style.label}>{isEmptyMessage}</span>
  }

  return (
    <div className={style.list}>
      {items.map(item => (
        <button
          key={item.id}
          className={style.listItem}
          onClick={item.onClick} 
          type="button"
        >
          <span>{item.label}</span>
          <span className={style.arrow}>›</span>
        </button>
      ))}
    </div>
  )
}

export default ProfileList