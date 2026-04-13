'use client'
import { useEffect, useState } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import { useRouter } from 'next/navigation'

import PersonalDataSection from './sections/PersonalDataSection'
import { LoadingOverlay } from '@/components/loading/LoadingOverlay'
import { getMyData } from '@/service/user/getUser'
import { UserMyDataResponse } from '@/interfaces/request-interfaces/request-user.interface'


const ProfileContent = () => {
  const router = useRouter()

  const [user, setUser] = useState<UserMyDataResponse | null>(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const init = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      router.push("/auth")
      return
    }

    try {
      const data = await getMyData()
      setUser(data)
    } catch (error: any) {
      const status = error?.response?.status

      if (status === 401 || status === 403) {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        router.push("/auth")
      } else {
        console.error("Erro inesperado:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  init()
}, [router])

  if (loading || !user) {
    return (
      <PageContainer gap={16}>
        <LoadingOverlay isLoading={true} />
      </PageContainer>
    )
  }

  return (
    <PageContainer gap={16}>
      <LoadingOverlay isLoading={loading} />

      <PersonalDataSection
        user={user}
        onSave={setUser}
      />

      {/*
      <PhonesSection
        phones={user.phones}
        onSave={(phones) =>
          setUser(prev => prev && ({ ...prev, phones }))
        }
      />

      <AddressesSection
        addresses={user.addresses}
        onSave={(addresses) =>
          setUser(prev => prev && ({ ...prev, addresses }))
        }
      />

      <CreditCardsSection
        cards={user.cards}
        onSave={(cards) =>
          setUser(prev => prev && ({ ...prev, cards }))
        }
      />
      */}
    </PageContainer>
  )
}

export default ProfileContent