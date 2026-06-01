import { SearchContent } from "@/contents/search/searchContent"
import { Suspense } from "react"

const SearchPage = () => {
    return (
        <Suspense fallback={null}>
            <SearchContent />
        </Suspense>
    )
}

export default SearchPage