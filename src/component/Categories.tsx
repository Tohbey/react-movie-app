import { useRef, useState } from "react";

type CategoriesProps = {
  categories: string[];
  containerClass: string;
  chipClass: string;
};

export default function Categories({
  categories,
  containerClass,
  chipClass,
}: CategoriesProps) {
  console.log("categories ", categories);
  console.log("containerClass ", containerClass);
  console.log("chipClass ", chipClass);
  const [activeIndex, setActiveIndex] = useState(0);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const changeCategory = (index: number) => {
    setActiveIndex(index);
    hostRef.current?.dispatchEvent(
      new CustomEvent("categoryChange", {
        detail: {
          index,
          value: categories[index],
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  return (
    <div className={containerClass}>
      {categories.map((category, index) => (
        <div
          ref={hostRef}
          key={category}
          className={`${chipClass} ${index === activeIndex ? "active" : ""}`}
          onClick={() => changeCategory(index)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
