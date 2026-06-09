'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoadingOverlay } from '../loading/LoadingOverlay'

interface AdminGuardProps {
    children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')

        if (!token) {
            router.replace('/auth')
            return
        }

        if (role !== 'ROLE_ADMIN') {
            router.replace('/profile')
            return
        }

        setLoading(false)
    }, [router])

    if (loading) {
        return <LoadingOverlay isLoading={loading}/>
    }

    return <>{children}</>
}