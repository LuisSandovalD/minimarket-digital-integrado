export default function DashboardHeader() {

  return (

    <div
      className="
        flex
        items-center
        justify-between
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold

            text-slate-800
            dark:text-white
          "
        >
          Dashboard
        </h1>

        <p
          className="
            mt-1

            text-sm

            text-slate-500
            dark:text-slate-400
          "
        >
          Bienvenido al panel principal
        </p>

      </div>

    </div>

  );

}