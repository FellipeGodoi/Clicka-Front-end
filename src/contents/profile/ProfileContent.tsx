'use client'
import { useEffect, useState } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import { useRouter } from 'next/navigation'

import PersonalDataSection from './sections/PersonalDataSection'
import { LoadingOverlay } from '@/components/loading/LoadingOverlay'
import { getMyData } from '@/service/user/getUser'
import { UserMyDataResponse } from '@/interfaces/request-interfaces/request-user.interface'
import PhonesSection from './sections/PhoneSection'
import AddressesSection from './sections/AddressSection'
import CreditCardsSection from './sections/CreditCardsSection'
import OrdersSection from './sections/OrdersSection'
import { logout } from '@/service/auth/logout'


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

  const reloadProfile = async () => {
    try {
      setLoading(true)
      const data = await getMyData()
      setUser(data)
    } catch (error) {
      console.error("Erro ao recarregar perfil", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()

    router.push('/auth')
    router.refresh()
  }

  if (loading || !user) {
    return (
      <PageContainer gap={16}>
        <LoadingOverlay isLoading={true} />
      </PageContainer>
    )
  }

  return (
    <PageContainer gap={16} >
      <LoadingOverlay isLoading={loading} />

      <PersonalDataSection
        user={user}
        onSave={setUser}
      />

      <PhonesSection
        phones={user?.phones || []}
        onReload={reloadProfile}

      />

      <AddressesSection
        addresses={user?.addresses || []}
        onReload={reloadProfile}
      />

      <CreditCardsSection
        cards={user?.cards || []}
        onReload={reloadProfile}
      />

      <OrdersSection />

      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          style={{padding:"0px 12px"}}
          className="
            flex items-center gap-2
            h-10 px-4
            rounded-md
            border border-red-500
            text-red-500
            hover:bg-red-500 hover:text-white
            transition-colors
            cursor-pointer
          "
        >
          <i className="ri-logout-box-r-line text-xl" />
          <span>Sair</span>
        </button>
      </div>
    </PageContainer>
  )
}

export default ProfileContent