import { AsideNavigationSkeleton } from "@/components/skeletons";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // O tu enrutador equivalente (Next.js usaría usePathname/useRouter)
import AsideGroupTitle from "./AsideGroupTitle";
import AsideItem from "./AsideItem";
import AsideSection from "./AsideSection";

export default function AsideNavigation({ menuItems = [], activeItem, setActiveItem, isCollapsed, isLoading = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // SINCRONIZACIÓN DE RUTA AL ACTUALIZAR O NAVEGAR
  // =========================================================
  useEffect(() => {
    // Extraemos la última parte de la ruta actual (ej: "/admin/analytics" -> "analytics")
    const currentPath = location.pathname.split("/").pop();

    // Buscamos si existe un item en el menú que coincida con la URL actual
    const currentItem = menuItems
      .flatMap((section) => section.items)
      .find((item) => item.href === currentPath || item.id === currentPath);

    if (currentItem) {
      setActiveItem(currentItem.id);
    } else if (currentPath === "" || currentPath === "admin") {
      // Fallback por si está en la raíz del panel administrativo
      setActiveItem("dashboard");
    }
  }, [location.pathname, menuItems, setActiveItem]);

  // =========================================================
  // RENDER DE SKELETON
  // =========================================================
  if (isLoading) {
    return <AsideNavigationSkeleton isCollapsed={isCollapsed} />;
  }

  // Manejador del click para cambiar la URL físicamente
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    navigate(item.href); // Empuja la nueva ruta al historial del navegador
  };

  // =========================================================
  // RENDER COMPONENTE COMPLETO
  // =========================================================
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
      <div className="space-y-6">
        {menuItems.map((section) => (
          <AsideSection key={section.section} bordered={false}>
            {/* TÍTULO DE SECCIÓN */}
            <AsideGroupTitle title={section.section} isCollapsed={isCollapsed} />

            {/* ITEMS */}
            <div className="space-y-1">
              {section.items.map((item) => (
                <AsideItem
                  key={item.id}
                  {...item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
          </AsideSection>
        ))}
      </div>
    </nav>
  );
}
