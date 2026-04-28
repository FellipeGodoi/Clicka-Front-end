'use client'

import { IconComponent } from '@/contents/renders/IconComponent'
import styles from './styles.module.css'
import logo from '@/media/images/mini-logo.svg'
import { usePathname } from 'next/navigation'

const Footer = () => {

  const pathname = usePathname()
  const allowedPaths = ["/", "/product/**"]
  const showTypebot = allowedPaths.includes(pathname)

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Logo + nome */}
        <div className={styles.brand}>
          <IconComponent
            Icon={logo}
            width={100}
            height={36}
          />
        </div>

        {/* Links */}
        <nav className={styles.links}>
          <a href="/sobre">Sobre</a>
          <a href="/contato">Contato</a>
          <a href="/politica-privacidade">Privacidade</a>
        </nav>

        {/* Copyright */}
        <span className={styles.copy}>
          © {new Date().getFullYear()} CLICKA. Todos os direitos reservados.
        </span>
      </div>

      {showTypebot && (
        <iframe
          title="Typebot"
          src="https://typebot.co/product-recommendation-zv4zejp"
          style={{ border: "none", width: "100%", height: "600px" }}
        />
      )}

    </footer>
  )
}

export default Footer