import DashboardCategoryContent from "@/contents/dashboards-content/DashboardCategoryContent"
import DashboardsContent from "@/contents/dashboards-content/DashboardsContent"
import { Suspense } from "react"

const DashboardsPage= () => {
    return (
        <Suspense fallback={null}>
            {/* <DashboardsContent/> */}
            <DashboardCategoryContent/>
        </Suspense>
    )
}

export default DashboardsPage