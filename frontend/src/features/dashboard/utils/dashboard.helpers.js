export function formatMoney(value) {

  return new Intl.NumberFormat(
    "es-PE",
    {

      style: "currency",

      currency: "PEN",

    }
  ).format(value);

}