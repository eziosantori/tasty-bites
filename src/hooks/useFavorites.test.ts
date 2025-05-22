import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import type { Recipe } from '@/types/recipe';

describe('useFavorites', () => {
  const recipeA: Recipe = {
    idMeal: '1',
    strMeal: 'Meal A',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strTags: '',
    strYoutube: '',
    strSource: '',
  };
  const recipeB: Recipe = {
    idMeal: '2',
    strMeal: 'Meal B',
    strCategory: '',
    strArea: '',
    strInstructions: '',
    strMealThumb: '',
    strTags: '',
    strYoutube: '',
    strSource: '',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([recipeA]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([recipeA]);
  });

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(recipeA);
    });
    expect(result.current.favorites).toContainEqual(recipeA);
    expect(localStorage.getItem('favorites')).toContain('Meal A');
  });

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(recipeA);
      result.current.removeFavorite('1');
    });
    expect(result.current.favorites).toHaveLength(0);
  });

  it('toggles a favorite (add/remove)', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggleFavorite(recipeB);
    });
    expect(result.current.isFavorite('2')).toBe(true);
    act(() => {
      result.current.toggleFavorite(recipeB);
    });
    expect(result.current.isFavorite('2')).toBe(false);
  });

  it('checks if a recipe is favorite', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(recipeA);
    });
    expect(result.current.isFavorite('1')).toBe(true);
    expect(result.current.isFavorite('2')).toBe(false);
  });
});
