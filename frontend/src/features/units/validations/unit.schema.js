import * as yup from "yup";

export const unitSchema = yup.object({

  name: yup
    .string()
    .required(
      "El nombre es obligatorio"
    ),

  abbreviation: yup
    .string()
    .required(
      "La abreviación es obligatoria"
    ),

  type: yup
    .string()
    .required(
      "El tipo es obligatorio"
    ),

  conversionFactor: yup
    .number()
    .positive()
    .required(
      "El factor es obligatorio"
    )

});