import {
  useState,
  forwardRef,
} from 'react';

import {
  Eye,
  EyeOff,
  Lock,
} from 'lucide-react';

const PasswordInput = forwardRef(
  (
    {
      label,
      error,

      className = '',
      inputClassName = '',

      disabled = false,
      fullWidth = true,

      helperText,

      ...props
    },
    ref
  ) => {
    const [show, setShow] =
      useState(false);

    return (
      <div
        className={`
          flex
          flex-col
          gap-1.5

          ${
            fullWidth
              ? 'w-full'
              : ''
          }

          ${className}
        `}
      >
        {/* ========================================
         * LABEL
         * ====================================== */}
        {label && (
          <label
            className="
              flex
              items-center
              gap-1.5

              px-1

              text-sm
              font-medium

              text-slate-700
              dark:text-slate-300
            "
          >
            {label}

            {props.required && (
              <span className="text-rose-500">
                *
              </span>
            )}
          </label>
        )}

        {/* ========================================
         * INPUT
         * ====================================== */}
        <div className="relative group">
          {/* ICON */}
          <div
            className="
              absolute
              left-4
              top-1/2
              z-10
              -translate-y-1/2

              text-slate-400
              dark:text-slate-500

              transition-colors
              duration-200

              group-focus-within:text-slate-600
              dark:group-focus-within:text-slate-300
            "
          >
            <Lock size={18} />
          </div>

          {/* INPUT */}
          <input
            ref={ref}
            type={
              show
                ? 'text'
                : 'password'
            }
            disabled={disabled}
            className={`
              w-full
              h-12

              rounded-2xl

              border

              bg-white/70
              dark:bg-slate-900/70

              backdrop-blur-xl

              text-sm
              text-slate-700
              dark:text-slate-200

              placeholder:text-slate-400
              dark:placeholder:text-slate-500

              outline-none

              transition-all
              duration-200

              pl-11
              pr-12

              ${
                error
                  ? `
                    border-rose-300
                    dark:border-rose-800

                    focus:border-rose-400
                    dark:focus:border-rose-700

                    focus:ring-4
                    focus:ring-rose-500/10
                  `
                  : `
                    border-slate-200/80
                    dark:border-slate-800/80

                    hover:border-slate-300
                    dark:hover:border-slate-700

                    focus:border-slate-300
                    dark:focus:border-slate-700

                    focus:ring-4
                    focus:ring-slate-500/5
                  `
              }

              ${
                disabled
                  ? `
                    cursor-not-allowed
                    opacity-60
                  `
                  : ''
              }

              ${inputClassName}
            `}
            {...props}
          />

          {/* TOGGLE BUTTON */}
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              setShow(!show)
            }
            className="
              absolute
              right-2
              top-1/2
              z-10
              -translate-y-1/2

              flex
              items-center
              justify-center

              h-8
              w-8

              rounded-xl

              text-slate-400
              dark:text-slate-500

              transition-all
              duration-200

              hover:bg-slate-100
              hover:text-slate-600

              dark:hover:bg-white/5
              dark:hover:text-slate-300

              disabled:pointer-events-none
            "
          >
            {show ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {/* ========================================
         * FOOTER
         * ====================================== */}
        {(error || helperText) && (
          <div className="px-1">
            {error ? (
              <span
                className="
                  text-xs
                  font-medium

                  text-rose-500
                "
              >
                {error}
              </span>
            ) : (
              <span
                className="
                  text-xs

                  text-slate-500
                  dark:text-slate-400
                "
              >
                {helperText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName =
  'PasswordInput';

export default PasswordInput;