import LoginContent from "@/contents/auth-content/LoginContent"
import { Suspense } from "react"

const AuthenticatePage = () => {
    return (
        <Suspense fallback={null}>
            <LoginContent/>
        </Suspense>
    )
}

export default AuthenticatePage