import {
  defaultViewport,
  fadeUp,
  hoverLift,
  smoothTransition,
  staggerContainer,
} from "@/components/effects";
import { motion } from "framer-motion";
import MetricCard from "./MetricCard";

export default function StatsGrid({
  items = [],
  columns = 4,
  animate = true,
  renderItem,
  CardComponent = MetricCard,
  gridClassName = "",
  cardVariant = "default",
  cardClassName = "",
}) {
  const grids = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  const Container = animate ? motion.div : "div";
  const Item = animate ? motion.div : "div";

  return (
    <Container
      variants={animate ? staggerContainer : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "show" : undefined}
      viewport={animate ? { ...defaultViewport, once: true } : undefined}
      className={`grid gap-6 ${gridClassName || grids[columns] || grids[4]}`}
    >
      {items.map((item, index) => (
        <Item
          key={item.id ?? index}
          variants={animate ? fadeUp : undefined}
          transition={animate ? smoothTransition : undefined}
          whileHover={animate ? hoverLift : undefined}
          className="flex w-full"
        >
          {renderItem ? (
            renderItem(item, index)
          ) : (
            <CardComponent
              {...item}
              variant={item.variant ?? cardVariant}
              className={`w-full ${cardClassName}`}
            />
          )}
        </Item>
      ))}
    </Container>
  );
}
