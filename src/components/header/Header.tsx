'use client'

import { useEffect, useState } from 'react'
import TextInput from '@/components/inputs/text-input/TextInput'
import { IconComponent } from '@/contents/renders/IconComponent'
import logo from '@/media/images/mini-logo.svg'
import styles from './header.module.css'

import {
  ShoppingCartIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from '@/utils/hooks/UseNavigate'

const Header = () => {
  const [hasCartItems, setHasCartItems] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem('cart')

    if (cart) {
      try {
        const parsed = JSON.parse(cart)
        setHasCartItems(Array.isArray(parsed) && parsed.length > 0)
      } catch {
        setHasCartItems(false)
      }
    }
  }, [])

  const {navigateTo} = useNavigate()



  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Logo */}
        <div className={styles.logo}>
          <IconComponent
            Icon={logo}
            width={100}
            height={40}
          />
        </div>

        {/* Busca */}
        <div className={styles.search}>
          <TextInput
            label=""
            placeholder="Buscar produtos..."
            type="text"

          />
        </div>

        {/* Ações */}
        <div className={styles.actions}>

          {/* Carrinho */}
          <button className={styles.iconButton} onClick={() => navigateTo('/cart')}>
            <ShoppingCartIcon width={24} height={24} />

            {hasCartItems && <span className={styles.cartBadge} />}
          </button>

          {/* Perfil */}
          <button className={styles.iconButton}>
            <UserIcon width={24} height={24} onClick={() => navigateTo('/profile')}/>
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header