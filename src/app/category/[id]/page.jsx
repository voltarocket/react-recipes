'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFilteredCategory } from '../../lib/api';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/ui/Preloader';
import Link from 'next/link';

const MealList = dynamic(
    () =>
      import('../../../components/meal/MealList').then((mod) => mod.MealList), 
    {
      loading: () => <Preloader />,
      ssr: false,
    }
  );

export default function CategoryPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    getFilteredCategory(id)
      .then((data) => {
        setMeals(data.meals || []);
        setError(null);
      })
      .catch(() => {
        setError('Не удалось загрузить блюда.');
      });
  }, [id]);

  return (
    <div className="p-4">
      <Link href="/" className="text-blue-500 hover:underline block mb-4">
        ← Go Back
      </Link>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : !meals.length ? (
        <Preloader />
      ) : (
        <MealList meals={meals} />
      )}
    </div>
  );
}
