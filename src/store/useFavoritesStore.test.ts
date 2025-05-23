import { act } from 'react';
import { useFavoritesStore } from './useFavoritesStore';

describe('useFavoritesStore', () => {
  beforeEach(() => {
    // Clear favorites before each test
    act(() => {
      useFavoritesStore.getState().clearFavorites();
    });
  });

  it('should add a favorite', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite('apple');
    });
    expect(useFavoritesStore.getState().favorites).toContain('apple');
  });

  it('should not add duplicate favorites', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite('banana');
      useFavoritesStore.getState().addFavorite('banana');
    });
    expect(useFavoritesStore.getState().favorites).toEqual(['banana']);
  });

  it('should remove a favorite', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite('carrot');
      useFavoritesStore.getState().removeFavorite('carrot');
    });
    expect(useFavoritesStore.getState().favorites).not.toContain('carrot');
  });

  it('should check if an item is a favorite', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite('date');
    });
    expect(useFavoritesStore.getState().isFavorite('date')).toBe(true);
    expect(useFavoritesStore.getState().isFavorite('fig')).toBe(false);
  });

  it('should clear all favorites', () => {
    act(() => {
      useFavoritesStore.getState().addFavorite('eggplant');
      useFavoritesStore.getState().addFavorite('fig');
      useFavoritesStore.getState().clearFavorites();
    });
    expect(useFavoritesStore.getState().favorites).toEqual([]);
  });
});
