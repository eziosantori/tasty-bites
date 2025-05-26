import React from "react";

const MockRecipeDetailDialog = ({ open }: { open: boolean }) =>
  open ? <div data-testid="dialog">Dialog Open</div> : null;

export default MockRecipeDetailDialog;
