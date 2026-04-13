'use client'

import { useState } from 'react'
import logo from "@/media/images/clicka-transparent-logo.svg"
import LoginForm from '@/components/forms/login-form/LoginForm'
import styles from './login-content.module.css'
import { IconComponent } from '../renders/IconComponent'
import RegisterForm from '@/components/forms/register-form/RegisterForm'

const LoginPage = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const isLogin = mode === 'login'

    return (
        <div className={styles.page}>
            <div className={`${styles.container} ${isLogin ? styles.loginMode : styles.registerMode
                }`}
            >
                <div className={styles.leftPanel}>
                    <IconComponent Icon={logo} height={150} width={355} color='white' />
                    <p className={styles.subtitle}>
                        {isLogin
                            ? 'Se já possui cadastro faça seu login.'
                            : 'Esse será apenas o primeiro passo, para concluir sua compra posteriormente você necessitara realizar registros de cartões e endereços de entrega.'}
                    </p>
                </div>

                {/* Painel Direito — FORM */}
                <div className={styles.rightPanel}>

                    {/* Tabs */}
                    <div className={styles.tabs}>
                        <button
                            onClick={() => setMode('login')}
                            className={`${styles.tabButton} ${isLogin ? styles.active : ''}`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setMode('register')}
                            className={`${styles.tabButton} ${!isLogin ? styles.active : ''}`}

                        >
                            Cadastrar
                        </button>

                        <span
                            className={`${styles.indicator} ${isLogin ? styles.indicatorLogin : styles.indicatorRegister
                                }`}
                        />
                    </div>

                    {/* Conteúdo */}
                    <div className={styles.content}>
                        {isLogin ? (
                            <LoginForm />
                        ) : (
                            <RegisterForm />
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginPage