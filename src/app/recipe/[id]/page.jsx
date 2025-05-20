import { getMealById } from '../../lib/api'
import Link from 'next/link'

export default async function RecipePage({ params }) {
  const mealData = await getMealById(params.id)
  const meal = mealData?.meals?.[0]

  if (!meal) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Recipe not found</p>
        <Link href="/" className="text-blue-500 underline">← Go Home</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <Link href="/" className="text-blue-500 hover:underline mb-4">← Go Back</Link>

      <h1 className="text-2xl font-bold mb-4">{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-auto rounded mb-4"
      />

      <h6 className="mb-2 text-gray-700"><strong>Category:</strong> {meal.strCategory}</h6>
      <p className="mb-2 text-gray-700"><strong>Area:</strong> {meal.strArea}</p>

      <p className="text-gray-700 whitespace-pre-line mb-6">
        {meal.strInstructions}
      </p>

      <h2 className="text-xl font-semibold mb-2">Ингредиенты:</h2>
      <table className="w-full mt-2 mb-6 table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Ингредиент</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Количество</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 20 }).map((_, i) => {
            const ingredient = meal[`strIngredient${i + 1}`]
            const measure = meal[`strMeasure${i + 1}`]

            if (!ingredient || ingredient.trim() === '') return null

            return (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2">{ingredient}</td>
                <td className="border border-gray-300 px-4 py-2">{measure}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {meal.strYoutube && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Видео рецепт:</h2>
          <iframe
            className="w-full h-64"
            src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}
