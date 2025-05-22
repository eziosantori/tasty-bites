import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

// Mock the useFavorites hook using relative path
jest.mock('../hooks/useFavorites', () => ({
  useFavorites: jest.fn(),
}));

import { useFavorites } from '../hooks/useFavorites';

const mockedUseFavorites = useFavorites as jest.Mock;

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the brand and navigation links', () => {
    mockedUseFavorites.mockReturnValue({ favorites: [] });
    render(<NavBar />);
    expect(screen.getByText('Tasty')).toBeInTheDocument();
    expect(screen.getByText('Bites')).toBeInTheDocument();
    // Check that at least one element contains 'Home'
    expect(screen.queryAllByText('Home').length).toBeGreaterThanOrEqual(1);
    // Check that at least one element contains 'Explore'
    expect(screen.queryAllByText('Explore').length).toBeGreaterThanOrEqual(1);
    // The favorites link is always present
    expect(screen.getByRole('link', { name: /view favorites/i })).toBeInTheDocument();
  });

  it('shows the favorites badge with correct count', () => {
    mockedUseFavorites.mockReturnValue({ favorites: [{ idMeal: '1' }, { idMeal: '2' }] });
    render(<NavBar />);
    expect(screen.getByLabelText('2 favorites')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not show the favorites badge when there are no favorites', () => {
    mockedUseFavorites.mockReturnValue({ favorites: [] });
    render(<NavBar />);
    // The badge is only rendered if favorites.length > 0
    expect(screen.queryByLabelText(/\d+ favorite/)).not.toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view favorites/i })).toBeInTheDocument();
  });
});
