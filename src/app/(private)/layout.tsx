import Navbar from "@/components/navbar/Navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Navbar/>
      <main style={{display: 'flex', marginLeft:180, marginTop: 20, height: "95dvh", marginBottom:20,  marginRight:20}}>
        {children}
      </main>
    </>
  )
}