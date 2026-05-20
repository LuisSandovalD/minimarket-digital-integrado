import AsideItem from "./AsideItem";
import AsideSection from "./AsideSection";
import AsideGroupTitle from "./AsideGroupTitle";

export default function AsideNavigation({
  menuItems = [],
  activeItem,
  setActiveItem,
  isCollapsed,
}) {
  return (
    <nav
      className="
        flex-1
        overflow-y-auto

        px-3
        py-4

        scrollbar-thin
        scrollbar-thumb-slate-300
        dark:scrollbar-thumb-slate-700
      "
    >
      <div className="space-y-6">
        {menuItems.map((section) => (
          <AsideSection key={section.section} bordered={false}>
            {/* ========================================
             * TÍTULO DE SECCIÓN
             * ====================================== */}
            <AsideGroupTitle
              title={section.section}
              isCollapsed={isCollapsed}
            />

            {/* ========================================
             * ITEMS
             * ====================================== */}
            <div className="space-y-1">
              {section.items.map((item) => (
                <AsideItem
                  key={item.id}
                  {...item}
                  isActive={activeItem === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveItem(item.id)}
                />
              ))}
            </div>
          </AsideSection>
        ))}
      </div>
    </nav>
  );
}
