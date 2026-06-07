'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ProductResponse,
  searchProducts,
} from '@/service/user/getProducts'

import styles from './style.module.css'

interface ProductSearchInputProps {
  onSelect: (product: ProductResponse) => void
}

export default function DashboardSearchInput({
  onSelect,
}: ProductSearchInputProps) {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [showResults, setShowResults] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!search.trim()) {
      setProducts([])
      return
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const response = await searchProducts({
          search,
          size: 3,
          page: 0,
        })

        setProducts(response.content ?? [])
      } catch (error) {
        console.error(error)
      }
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [search])

  const handleSelect = (product: ProductResponse) => {
    onSelect(product)

    setSearch('')
    setProducts([])
    setShowResults(false)
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Adicionar produto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowResults(true)}
        className={styles.input}
      />

      {showResults && products.length > 0 && (
        <div className={styles.dropdown}>
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              className={styles.item}
              onClick={() => handleSelect(product)}
            >
              {product.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}