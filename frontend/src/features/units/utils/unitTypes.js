export const UNIT_LABELS = {
  LITER: "Litro",
  HALF_LITER: "Medio Litro",
  QUARTER_LITER: "Cuarto Litro",
  MILLILITER: "Mililitro",
  GRAM: "Gramo",
  KILOGRAM: "Kilogramo",
  UNIT: "Unidad",
  BOX: "Caja",
  PACK: "Paquete",
  DOZEN: "Docena",
  METER: "Metro",
  SQUARE_METER: "Metro Cuadrado",
};

export const UNIT_OPTIONS = Object.keys(UNIT_LABELS).map((key) => ({
  value: key,
  label: UNIT_LABELS[key],
}));
