import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import AiAssistant from '@/components/AI-chat/AI-assistant'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <AiAssistant/>
      <main style={{ marginTop: 60, display: 'flex', justifyContent: 'center' }}>
        {children}
      </main>

      <Footer />
    </>
  )
}