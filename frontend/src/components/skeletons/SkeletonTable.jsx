// components/skeletons/SkeletonTable.jsx

export default function SkeletonTable({ columns = 6, rows = 8 }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div
        className="
          border-b
          border-slate-200
          bg-slate-50
          px-6
          py-4

          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div
              key={index}
              className="
                h-4
                flex-1
                rounded-lg
                bg-slate-200

                dark:bg-slate-700
              "
            />
          ))}
        </div>
      </div>

      <div
        className="
          divide-y
          divide-slate-100

          dark:divide-slate-800
        "
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="grid gap-4 px-6 py-5"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))`,
            }}
          >
            {Array.from({ length: columns }).map((_, col) => (
              <div
                key={col}
                className="
                  h-4
                  rounded-lg
                  bg-slate-100

                  dark:bg-slate-900
                "
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
