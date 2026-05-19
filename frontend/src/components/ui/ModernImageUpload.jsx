import {
  ImagePlus,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function ModernImageUpload({
  value,
  onChange,

  label = "Imagen",
  description = "PNG, JPG o WEBP",

  height = "h-96",
}) {

  const inputRef = useRef(null);

  const [preview, setPreview] =
    useState(null);

  const [dragging, setDragging] =
    useState(false);

  // =========================================
  // SYNC VALUE
  // =========================================

  useEffect(() => {

    if (!value) {

      setPreview(null);

      return;

    }

    // BASE64 / URL
    if (
      typeof value === "string"
    ) {

      setPreview(value);

    }

  }, [value]);

  // =========================================
  // OPEN FILE PICKER
  // =========================================

  const handleOpen = () => {

    inputRef.current?.click();

  };

  // =========================================
  // FILE TO BASE64
  // =========================================

  const fileToBase64 =
    (file) => {

      return new Promise(

        (resolve, reject) => {

          const reader =
            new FileReader();

          reader.readAsDataURL(file);

          reader.onload =
            () => {

              resolve(
                reader.result
              );

            };

          reader.onerror =
            (error) => {

              reject(error);

            };

        }

      );

    };

  // =========================================
  // PROCESS FILE
  // =========================================

  const processFile =
    async (file) => {

      if (!file) return;

      try {

        const base64 =
          await fileToBase64(
            file
          );

        setPreview(base64);

        onChange?.(base64);

      } catch (error) {

        console.error(error);

      }

    };

  // =========================================
  // INPUT CHANGE
  // =========================================

  const handleImageChange =
    async (e) => {

      const file =
        e.target.files?.[0];

      processFile(file);

    };

  // =========================================
  // REMOVE IMAGE
  // =========================================

  const handleRemove = () => {

    setPreview(null);

    onChange?.(null);

    if (inputRef.current) {

      inputRef.current.value =
        "";

    }

  };

  // =========================================
  // DRAG EVENTS
  // =========================================

  const handleDragOver =
    (e) => {

      e.preventDefault();

      setDragging(true);

    };

  const handleDragLeave =
    (e) => {

      e.preventDefault();

      setDragging(false);

    };

  const handleDrop =
    async (e) => {

      e.preventDefault();

      setDragging(false);

      const file =
        e.dataTransfer.files?.[0];

      processFile(file);

    };

  return (
    <div className="w-full space-y-3">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">

        <div>

          <label
            className="
              text-sm
              font-semibold
              text-slate-800
              dark:text-slate-100
            "
          >
            {label}
          </label>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {description}
          </p>
        </div>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-red-400/20
              bg-red-500/10
              text-red-500
              transition-all
              duration-200

              hover:bg-red-500/20
            "
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* =====================================
       * CONTAINER
       * =================================== */}

      <div
        onClick={handleOpen}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          group
          relative
          w-full
          overflow-hidden
          rounded-[28px]
          border
          transition-all
          duration-300
          cursor-pointer

          ${height}

          ${
            dragging
              ? `
                border-blue-500
                bg-blue-500/5
                shadow-2xl
                shadow-blue-500/10
                scale-[1.01]
              `
              : `
                border-slate-200
                dark:border-slate-800
                bg-white
                dark:bg-slate-950

                hover:border-slate-300
                hover:shadow-xl

                dark:hover:border-slate-700
              `
          }
        `}
      >

        {/* =====================================
         * IMAGE PREVIEW
         * =================================== */}

        {preview ? (
          <>
            {/* IMAGE */}
            <img
              src={preview}
              alt="Preview"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                transition-transform
                duration-700

                group-hover:scale-105
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute
                inset-0

                bg-gradient-to-t
                from-black/75
                via-black/10
                to-black/10
              "
            />

            {/* DRAG ACTIVE */}
            {dragging && (
              <div
                className="
                  absolute
                  inset-0
                  z-30
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4

                  bg-blue-500/20
                  backdrop-blur-sm
                "
              >
                <Upload
                  size={42}
                  className="text-white"
                />

                <p
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  Suelta la imagen aquí
                </p>
              </div>
            )}

            {/* CONTENT */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                z-20
                flex
                items-end
                justify-between
                gap-4
                p-6
              "
            >

              {/* INFO */}
              <div>

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/10
                    px-4
                    py-2

                    backdrop-blur-md
                  "
                >
                  <ImageIcon
                    size={16}
                    className="text-white/80"
                  />

                  <span
                    className="
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    Imagen cargada
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    text-sm
                    text-white/70
                  "
                >
                  Haz clic o arrastra una nueva
                  imagen para reemplazarla.
                </p>
              </div>

              {/* ACTION */}
              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/10
                  px-5
                  py-3

                  text-sm
                  font-medium
                  text-white

                  backdrop-blur-md

                  transition-all
                  duration-200

                  hover:bg-white/20
                "
              >
                <Upload size={16} />

                Cambiar
              </button>
            </div>
          </>
        ) : (
          <div
            className="
              relative
              flex
              h-full
              w-full
              flex-col
              items-center
              justify-center
              overflow-hidden

              bg-gradient-to-br
              from-slate-50
              via-white
              to-slate-100/80

              dark:from-slate-900
              dark:via-slate-950
              dark:to-slate-900
            "
          >

            {/* BG EFFECT */}
            <div
              className="
                absolute
                -top-24
                -right-24
                h-72
                w-72
                rounded-full
                bg-blue-500/10
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-24
                -left-24
                h-72
                w-72
                rounded-full
                bg-violet-500/10
                blur-3xl
              "
            />

            {/* CONTENT */}
            <div
              className="
                relative
                z-10
                flex
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              {/* ICON */}
              <div
                className={`
                  flex
                  h-28
                  w-28
                  items-center
                  justify-center
                  rounded-[32px]
                  border
                  transition-all
                  duration-300

                  ${
                    dragging
                      ? `
                        border-blue-500/40
                        bg-blue-500/10
                        scale-110
                      `
                      : `
                        border-slate-200
                        dark:border-slate-700

                        bg-white/90
                        dark:bg-slate-900/90
                      `
                  }
                `}
              >
                {dragging ? (
                  <Upload
                    size={46}
                    className="
                      text-blue-500
                    "
                  />
                ) : (
                  <ImagePlus
                    size={46}
                    className="
                      text-slate-500
                      dark:text-slate-400
                    "
                  />
                )}
              </div>

              {/* TEXT */}
              <div className="mt-7 space-y-2">

                <h3
                  className="
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-800
                    dark:text-slate-100
                  "
                >
                  {dragging
                    ? "Suelta tu imagen"
                    : "Sube una imagen"}
                </h3>

                <p
                  className="
                    mx-auto
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Arrastra una imagen aquí
                  o haz clic para seleccionarla
                  desde tu dispositivo.
                </p>
              </div>

              {/* BUTTON */}
              <button
                type="button"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl

                  bg-slate-900
                  dark:bg-white

                  px-6
                  py-3

                  text-sm
                  font-medium

                  text-white
                  dark:text-slate-900

                  shadow-lg

                  transition-all
                  duration-200

                  hover:scale-[1.02]
                "
              >
                <Upload size={17} />

                Seleccionar imagen
              </button>
            </div>
          </div>
        )}

        {/* INPUT */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );

}