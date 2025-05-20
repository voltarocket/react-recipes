import { MealItem } from "./MealItem";

export function MealList({ meals = [] }) {
  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {meals.map((meal) => (
              <MealItem key={meal.idMeal} {...meal} />
          ))}
      </div>
  )
}
