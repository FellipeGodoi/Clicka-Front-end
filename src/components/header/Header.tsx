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
import { FullLogoIcon } from '@/media/icon-component/FullLogoIcon'

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

  const { navigateTo } = useNavigate()

  const [search, setSearch] = useState<string>('')

  const handleSearch = () => {
    if (!search.trim()) return
    navigateTo(`/search?query=${encodeURIComponent(search)}`)
  }



  return (
    <header className={styles.header}>
      <div className={styles.inner}>

        {/* Logo */}
        <div className={styles.logo} style={{ cursor: "pointer" }} onClick={() => navigateTo('/')}>
          <FullLogoIcon height={40} width={125} fill={"#0D3B5D"} />
        </div>

        {/* Busca */}
        <div className={styles.search}>
          <TextInput
            label=""
            placeholder="Buscar produtos..."
            type="text"
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && search.trim()) {
                handleSearch()
              }
            }}
          />

          <button
            disabled={search === '' ? true : false}
            onClick={handleSearch}
            style={{
              marginLeft: '8px',
              padding: '10px 16px',
              backgroundColor: search === '' ? '#498a72' : '#0D6444',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: search === '' ? 'not-allowed' : 'pointer',
              fontWeight: 600
            }}
          >
            BUSCAR
          </button>
        </div>



        {/* Ações */}
        <div className={styles.actions}>

          {/* Carrinho */}
          <button id='cart-button' className={styles.iconButton} onClick={() => navigateTo('/cart')}>
            <ShoppingCartIcon width={24} height={24} />

            {hasCartItems && <span className={styles.cartBadge} />}
          </button>

          {/* Perfil */}
          <button id='profile-button' className={styles.iconButton}>
            <UserIcon width={24} height={24} onClick={() => navigateTo('/profile')} />
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header