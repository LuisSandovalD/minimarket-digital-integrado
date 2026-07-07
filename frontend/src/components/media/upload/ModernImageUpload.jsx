import { ImageIcon, ImagePlus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ModernImageUpload({
  value,
  onChange,
  label = "Imagen",
  description = "PNG, JPG o WEBP",
  height = "h-96",
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }

    // Imagen existente (Cloudinary)
    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    // Archivo recién seleccionado
    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleOpen = () => {
    inputRef.current?.click();
  };

  const processFile = (file) => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);

    onChange?.(file);
  };

  const handleImageChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleRemove = (e) => {
    e.stopPropagation();

    setPreview(null);

    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragging(false);

    processFile(e.dataTransfer.files?.[0]);
  };

  const isFlexChild = height.includes("h-full") || height.includes("flex-1");

  return (
    <div
      className={`w-full space-y-3 flex flex-col ${
        isFlexChild ? "h-full flex-1" : ""
      }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 flex-shrink-0">
        <div>
          <label className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {label}
          </label>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-500 transition-all duration-200 hover:bg-red-500/20"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* UPLOAD */}
      <div
        onClick={handleOpen}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative w-full overflow-hidden rounded-[28px] border transition-all duration-300 cursor-pointer ${height}
        ${
          dragging
            ? "border-blue-500 bg-blue-500/5 shadow-2xl shadow-blue-500/10 scale-[1.01]"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
        }`}
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10" />

            {dragging && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-blue-500/20 backdrop-blur-sm">
                <Upload size={42} className="text-white" />

                <p className="text-lg font-semibold text-white">
                  Suelta la imagen aquí
                </p>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <ImageIcon size={16} className="text-white/80" />

                  <span className="text-sm font-medium text-white">
                    Imagen cargada
                  </span>
                </div>

                <p className="mt-3 text-sm text-white/70">
                  Haz clic o arrastra una nueva imagen para reemplazarla.
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
              >
                <Upload size={16} />
                Cambiar
              </button>
            </div>
          </>
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100/80 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-[32px] border transition-all duration-300
                ${
                  dragging
                    ? "border-blue-500/40 bg-blue-500/10 scale-110"
                    : "border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-900/90"
                }`}
              >
                {dragging ? (
                  <Upload size={40} className="text-blue-500" />
                ) : (
                  <ImagePlus
                    size={40}
                    className="text-slate-500 dark:text-slate-400"
                  />
                )}
              </div>

              <div className="mt-5 space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  {dragging ? "Suelta tu imagen" : "Sube una imagen"}
                </h3>

                <p className="mx-auto max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Arrastra una imagen aquí o haz clic para seleccionarla.
                </p>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] dark:bg-white dark:text-slate-900"
              >
                <Upload size={14} />
                Seleccionar imagen
              </button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
