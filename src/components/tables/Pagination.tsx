'use client'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: Props) {

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-3 mt-6">

      <button
        disabled={currentPage === 0}
        style={{padding:"4px 12px", cursor: currentPage === 0 ? "default" : "pointer"}}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          
          rounded-lg
          border
          disabled:opacity-50
        "
      >
        Anterior
      </button>

      <span className="text-sm font-medium">
        Página {currentPage + 1} de {totalPages}
      </span>

      <button
        disabled={currentPage + 1 >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{padding:"4px 12px", cursor: currentPage + 1 >= totalPages ? "default" : "pointer"}}
        className="
          rounded-lg
          border
          disabled:opacity-50
        "
      >
        Próxima
      </button>

    </div>
  )
}