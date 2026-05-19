import React from 'react';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6">
      <div className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Producto */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Características
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Precios
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Documentación
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Cookies
                </a>
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Síguenos</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
          <div className="flex items-center justify-between flex-col md:flex-row gap-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Tu Empresa. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm inline-flex items-center gap-1">
              </a>
              <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm inline-flex items-center gap-1">
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}