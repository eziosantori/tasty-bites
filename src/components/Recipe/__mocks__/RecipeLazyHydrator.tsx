const RecipeLazyHydrator = ({
  children,
}: {
  children: () => React.ReactNode;
}) => {
  return <div data-testid="hydrator">{children()}</div>;
};
export default RecipeLazyHydrator;
