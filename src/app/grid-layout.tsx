import React from "react";

export default function GridLayout({
  pageTitle,
  addH1 = true,
  children,
}: {
  pageTitle: string;
  addH1?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      {addH1 && <h1>{pageTitle}</h1>}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
        aria-label={pageTitle}
      >
        {children}
      </div>
    </main>
  );
}
