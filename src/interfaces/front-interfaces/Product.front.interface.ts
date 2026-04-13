export interface ProductInterface {
  id: string
  name: string
  code: string
  originalPrice: number
  promoPrice: number
  describe: string
  estoque: number
  details?: Detail[]
}

export interface Detail {
  id: string
  label: string
  value: string
}

export const productMock: ProductInterface = {
  id: "0001",
  name: "Mouse Gamer Pro X",
  code: "123456",
  estoque: 20,
  originalPrice: 240.0,
  promoPrice: 180.0,
  describe:
    "Mouse gamer de alta performance com sensor óptico 3395, ideal para jogos competitivos. Possui construção leve, switches mecânicos duráveis e iluminação RGB personalizável.",

  details: [
    { id: "1", label: "Marca", value: "HyperTech" },
    { id: "2", label: "Categoria", value: "Periféricos" },
    { id: "3", label: "Peso", value: "63g" },
    { id: "4", label: "Dimensões", value: "12.5cm x 6.3cm x 3.8cm" },
    { id: "5", label: "Garantia", value: "12 meses" },
    { id: "6", label: "Cor", value: "Preto Fosco" },
    { id: "7", label: "Sensor", value: "PixArt 3395" },
    { id: "8", label: "DPI Máximo", value: "26.000 DPI" },
    { id: "9", label: "Polling Rate", value: "1000Hz" },
    { id: "10", label: "Switches", value: "80 milhões de cliques" },
    { id: "11", label: "Iluminação", value: "RGB customizável" },
    { id: "12", label: "Compatibilidade", value: "Windows / macOS / Linux" },
  ],
}