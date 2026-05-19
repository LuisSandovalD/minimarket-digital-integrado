export default function FooterBrand() {
  return (
    <div className="max-w-sm">
      <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-zinc-900
            font-black
            text-white
          "
        >
          E
        </div>

        <div>
          <h2 className="text-xl font-black">
            ERP POS
          </h2>

          <p className="text-sm text-zinc-500">
            Multiempresa
          </p>
        </div>
      </div>

      <p
        className="
          mt-5
          text-sm
          leading-relaxed
          text-zinc-500
        "
      >
        Plataforma moderna para la gestión
        empresarial, inventario, ventas y
        operaciones avanzadas.
      </p>
    </div>
  );
}