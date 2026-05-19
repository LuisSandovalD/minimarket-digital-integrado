// ========================================
// features/movements/components/LoadingMovements.jsx
// ========================================

import {
  History,
} from "lucide-react";

export default function LoadingMovements() {

  return (
    <div className="
      p-6
      space-y-6
      animate-pulse
    ">

      {/* ======================================== */}
      {/* HEADER SKELETON */}
      {/* ======================================== */}

      <div className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      ">

        <div className="
          p-6
        ">

          <div className="
            flex
            flex-col
            gap-6

            xl:flex-row
            xl:items-center
            xl:justify-between
          ">

            {/* LEFT */}

            <div className="
              flex
              items-start
              gap-4
            ">

              <div className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-slate-100

                dark:bg-slate-900
              ">

                <History className="
                  h-7
                  w-7
                  text-slate-300

                  dark:text-slate-700
                " />

              </div>

              <div className="
                space-y-3
              ">

                <div className="
                  h-4
                  w-24
                  rounded-lg
                  bg-slate-200

                  dark:bg-slate-800
                " />

                <div className="
                  h-8
                  w-72
                  rounded-xl
                  bg-slate-200

                  dark:bg-slate-800
                " />

                <div className="
                  h-4
                  w-96
                  rounded-lg
                  bg-slate-100

                  dark:bg-slate-900
                " />

              </div>

            </div>

            {/* BUTTON */}

            <div className="
              h-11
              w-40
              rounded-2xl
              bg-slate-200

              dark:bg-slate-800
            " />

          </div>

          {/* STATS */}

          <div className="
            mt-8
            grid
            grid-cols-2
            gap-4

            lg:grid-cols-3
            2xl:grid-cols-6
          ">

            {
              Array.from({
                length: 6,
              }).map((_, index) => (

                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-slate-100
                    bg-slate-50
                    p-4

                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                >

                  <div className="
                    mb-3
                    h-5
                    w-5
                    rounded-md
                    bg-slate-200

                    dark:bg-slate-700
                  " />

                  <div className="
                    h-7
                    w-16
                    rounded-lg
                    bg-slate-200

                    dark:bg-slate-700
                  " />

                  <div className="
                    mt-2
                    h-3
                    w-24
                    rounded-lg
                    bg-slate-100

                    dark:bg-slate-800
                  " />

                </div>

              ))
            }

          </div>

        </div>

      </div>

      {/* ======================================== */}
      {/* SEARCH SKELETON */}
      {/* ======================================== */}

      <div className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      ">

        <div className="
          h-11
          w-full
          rounded-xl
          bg-slate-100

          dark:bg-slate-900
        " />

      </div>

      {/* ======================================== */}
      {/* TABLE SKELETON */}
      {/* ======================================== */}

      <div className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-950
      ">

        {/* TABLE HEADER */}

        <div className="
          border-b
          border-slate-200
          bg-slate-50
          px-6
          py-4

          dark:border-slate-800
          dark:bg-slate-900
        ">

          <div className="
            flex
            items-center
            gap-6
          ">

            {
              Array.from({
                length: 8,
              }).map((_, index) => (

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

              ))
            }

          </div>

        </div>

        {/* TABLE BODY */}

        <div className="
          divide-y
          divide-slate-100

          dark:divide-slate-800
        ">

          {
            Array.from({
              length: 6,
            }).map((_, row) => (

              <div
                key={row}
                className="
                  grid
                  grid-cols-8
                  gap-4
                  px-6
                  py-5
                "
              >

                {
                  Array.from({
                    length: 8,
                  }).map((_, col) => (

                    <div
                      key={col}
                      className="
                        h-4
                        rounded-lg
                        bg-slate-100

                        dark:bg-slate-900
                      "
                    />

                  ))
                }

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );

}