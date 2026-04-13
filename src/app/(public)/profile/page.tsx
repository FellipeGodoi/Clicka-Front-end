import ProfileContent from "@/contents/profile/ProfileContent"
import { Suspense } from "react"

const ProfilePage = () => {
    return(
        <Suspense fallback={null}>
            <ProfileContent />
        </Suspense>
    )
}

export default ProfilePage