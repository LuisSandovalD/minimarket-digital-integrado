import { Loader2 } from 'lucide-react';

import { useState } from 'react';

export default function ModernButton({
  text = 'Botón',
  icon: Icon,

  onClick,
  action,

  loading = false,
  disabled = false,

  type = 'button',

  variant = 'primary',
  size = 'md',

  fullWidth = false,

  once = false,

  confirm = false,
  confirmText = '¿Estás seguro?',

  className = '',
  children,
}) {
  const [clicked, setClicked] =
    useState(false);

  /* ========================================
   * HANDLE CLICK
   * ====================================== */

  const handleClick = async (e) => {
    if (disabled || loading) return;

    if (once && clicked) return;

    if (confirm) {
      const accepted =
        window.confirm(confirmText);

      if (!accepted) return;
    }

    try {
      if (once) {
        setClicked(true);
      }

      if (onClick) {
        await onClick(e);
      }

      if (action) {
        await action(e);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /* ========================================
   * VARIANTS
   * ====================================== */

  const variants = {
    primary: `
      bg-slate-900
      text-white

      border
      border-slate-900/90

      hover:bg-slate-800
      hover:border-slate-800

      dark:bg-slate-100
      dark:text-slate-900

      dark:border-slate-100

      dark:hover:bg-white
    `,

    secondary: `
      bg-slate-100
      text-slate-700

      border
      border-slate-200

      hover:bg-slate-200/80
      hover:border-slate-300

      dark:bg-slate-800
      dark:text-slate-200

      dark:border-slate-700

      dark:hover:bg-slate-700
      dark:hover:border-slate-600
    `,

    success: `
      bg-emerald-600
      text-white

      border
      border-emerald-600

      hover:bg-emerald-500
      hover:border-emerald-500

      dark:bg-emerald-500
      dark:border-emerald-500

      dark:hover:bg-emerald-400
      dark:hover:border-emerald-400
    `,

    danger: `
      bg-rose-600
      text-white

      border
      border-rose-600

      hover:bg-rose-500
      hover:border-rose-500

      dark:bg-rose-500
      dark:border-rose-500

      dark:hover:bg-rose-400
      dark:hover:border-rose-400
    `,

    warning: `
      bg-amber-500
      text-white

      border
      border-amber-500

      hover:bg-amber-400
      hover:border-amber-400

      dark:bg-amber-400
      dark:text-slate-900

      dark:border-amber-400

      dark:hover:bg-amber-300
      dark:hover:border-amber-300
    `,

    ghost: `
      bg-transparent

      text-slate-600
      dark:text-slate-300

      border
      border-transparent

      hover:bg-slate-100
      dark:hover:bg-slate-800/70

      hover:text-slate-900
      dark:hover:text-white
    `,

    outline: `
      bg-white/70
      dark:bg-slate-900/40

      backdrop-blur-xl

      text-slate-700
      dark:text-slate-200

      border
      border-slate-200
      dark:border-slate-700

      hover:bg-slate-100
      dark:hover:bg-slate-800/60
    `,
  };
  /* ========================================
   * SIZES
   * ====================================== */

  const sizes = {
    sm: `
      h-9
      px-3

      text-sm
    `,

    md: `
      h-11
      px-4

      text-sm
    `,

    lg: `
      h-12
      px-5

      text-base
    `,

    xl: `
      h-14
      px-6

      text-lg
    `,

    icon: `
      w-11
      h-11

      p-0
    `,
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        group

        relative

        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        font-medium

        transition-all
        duration-200

        active:scale-[0.98]

        disabled:opacity-60
        disabled:cursor-not-allowed

        focus:outline-none
        focus:ring-2
        focus:ring-slate-300
        dark:focus:ring-slate-700

        ${variants[variant]}
        ${sizes[size]}

        ${fullWidth ? 'w-full' : ''}

        ${className}
      `}
    >
      {/* CONTENT */}
      <span
        className="
          relative
          z-10

          flex
          items-center
          justify-center
          gap-2
        "
      >
        {loading ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          Icon && (
            <Icon
              size={18}
              className="flex-shrink-0"
            />
          )
        )}

        {(children || text) && (
          <span>{children || text}</span>
        )}
      </span>
    </button>
  );
}