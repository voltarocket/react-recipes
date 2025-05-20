'use client';
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getAllCategories } from './lib/api';
import { Preloader } from '@/components/ui/Preloader';

const CategoryList = dynamic(() =>
  import('../components/category/CategoryList').then((mod) => mod.CategoryList), {
    loading: () => <Preloader />,
    ssr: false,
  }
);

export default function Home() {
  const [catalog, setCatalog] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllCategories().then((data) => {
      setCatalog(data.categories);
    });
  }, []);

  const filteredCatalog = useMemo(() => {
    return catalog.filter((category) =>
      category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [catalog, searchTerm]);

  return (
    <>
      {!catalog.length ? (
        <Preloader />
      ) : (
        <>
          <input
            type="text"
            placeholder="Поиск по категориям"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-black rounded-md p-2 mb-[20px] w-full"
          />
          <CategoryList catalog={filteredCatalog} />
        </>
      )}
    </>
  );
}
