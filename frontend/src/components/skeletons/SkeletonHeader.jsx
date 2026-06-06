// components/skeletons/SkeletonPageHeader.jsx

export default function SkeletonHeader({ stats = 3, showActions = true }) {
  return (
    <section
      className="
        relative
        overflow-hidden

        rounded-3xl

        border
        border-white/10

        bg-white/[0.04]

        backdrop-blur-2xl

        shadow-lg

        animate-pulse
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-br
          from-white/[0.05]
          via-transparent
          to-white/[0.02]
        "
      />

      <div className="relative z-10">
        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            gap-8

            px-6
            py-7

            md:px-8

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}

          <div className="flex items-start gap-5">
            {/* ICON */}

            <div
              className="
                h-14
                w-14
                rounded-2xl

                border
                border-white/10

                bg-white/[0.05]
              "
            />

            {/* CONTENT */}

            <div className="space-y-4">
              {/* BADGE */}

              <div
                className="
                  h-7
                  w-28
                  rounded-full

                  bg-white/10
                "
              />

              {/* TITLE */}

              <div className="space-y-3">
                <div
                  className="
                    h-8
                    w-72
                    rounded-xl

                    bg-white/10
                  "
                />

                <div
                  className="
                    h-4
                    w-[500px]
                    max-w-full
                    rounded-lg

                    bg-white/5
                  "
                />

                <div
                  className="
                    h-4
                    w-[350px]
                    max-w-full
                    rounded-lg

                    bg-white/5
                  "
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          {showActions && (
            <div className="flex gap-3">
              <div
                className="
                  h-11
                  w-36
                  rounded-xl

                  bg-white/10
                "
              />

              <div
                className="
                  h-11
                  w-11
                  rounded-xl

                  bg-white/10
                "
              />
            </div>
          )}
        </div>

        {/* STATS */}

        {stats > 0 && (
          <div
            className="
              grid

              border-t
              border-white/10

              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {Array.from({ length: stats }).map((_, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/10

                  px-6
                  py-5

                  sm:border-b-0
                  sm:border-r

                  last:border-r-0
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      h-10
                      w-10
                      rounded-xl

                      bg-white/10
                    "
                  />

                  <div className="space-y-2">
                    <div
                      className="
                        h-3
                        w-20
                        rounded

                        bg-white/5
                      "
                    />

                    <div
                      className="
                        h-4
                        w-24
                        rounded

                        bg-white/10
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    h-4
                    w-4
                    rounded

                    bg-white/10
                  "
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
