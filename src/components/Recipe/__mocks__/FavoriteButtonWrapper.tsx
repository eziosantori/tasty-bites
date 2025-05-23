const FavoriteButtonWrapperMock = ({ idMeal }: { idMeal: string }) => {
  return (
    <button data-testid="favorite-btn" data-id={idMeal}>
      Fav
    </button>
  );
};
export default FavoriteButtonWrapperMock;
