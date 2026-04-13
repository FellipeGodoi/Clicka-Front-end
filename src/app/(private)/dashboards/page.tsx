import DashboardsContent from "@/contents/dashboards-content/DashboardsContent"
import { Suspense } from "react"

const DashboardsPage= () => {
    return (
        <Suspense fallback={null}>
            <DashboardsContent/>
        </Suspense>
    )
}

export default DashboardsPage