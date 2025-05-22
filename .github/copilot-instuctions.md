# 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.


# ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

# 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.

# 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.


# Style & Conventions ✨

This section defines the style, architecture, and testing standards for this project, built with **React**, **TypeScript**, **Vite**, and **shadcn/ui**. Follow these conventions to ensure consistency, maintainability, accessibility, and thorough test coverage.

---

## 📁 Code Structure & Organization

- Use a feature-based folder structure. Group related components, hooks, and utilities together.
- Each React component should be in its own file. Extract complex logic into custom hooks or utility functions.
- Avoid unnecessary abstractions; introduce wrappers or higher-order components only if they add clear value.
- Prefer early returns in functions and components to reduce nesting.
- Separate business logic from UI components by using hooks or utility modules.

## 🏷️ Naming Conventions

- Use **PascalCase** for React components and TypeScript types/interfaces (e.g., `UserProfile`, `UserProfileProps`).
- Use **camelCase** for variables, functions, and object properties (e.g., `handleSubmit`, `userList`).
- File names should match the default export (e.g., `UserProfile.tsx` for `UserProfile` component).
- Prefix custom hooks with `use` (e.g., `useUserData`).

## 🛠️ TypeScript Best Practices

- Explicitly type all component props and state using interfaces or types.
- Prefer `interface` for public APIs and `type` for unions or complex types.
- Avoid using `any`. Use `unknown` and narrow types where necessary.
- Enable strict type-checking in `tsconfig.json`.

## ⚛️ React & shadcn/ui Guidelines

- Use functional components and React hooks exclusively.
- Use shadcn/ui components for UI consistency and accessibility. Customize via theme configuration or component overrides as needed.
- Keep component props minimal and focused; pass only necessary data and callbacks.
- Document custom components and their props with JSDoc or TypeScript comments.
- Optimize performance using React best practices: memoization (`React.memo`, `useMemo`), lazy loading, and code splitting.

## 🎨 Styling

- Use Tailwind CSS utility classes (required by shadcn/ui) for styling.
- Minimize custom CSS and scope it to components when needed.
- Use theme variables for colors, spacing, and typography consistency.

## ✅ Testing & Coverage

- Use Jest and React Testing Library for all unit and integration tests.
- Write tests focused on user behavior and outcomes, not implementation details.
- Each component and utility function must have tests covering:
  - Rendering and user interactions
  - Edge cases and error states
  - Accessibility (e.g., ARIA roles, keyboard navigation)
- Maintain high test coverage, tracking:
  - Statement coverage
  - Branch coverage
  - Function coverage
- Use descriptive test names and keep tests isolated.
- Place test files alongside the components they test, using `.test.tsx` or `.test.ts` suffix.

## 📚 Documentation & Comments

- Write clear, concise comments for complex logic or non-obvious decisions.
- Use JSDoc for public APIs, custom hooks, and utility functions.
- Keep documentation up to date as code evolves.

---

## 📋 Summary Table

| Area           | Convention                                                                  |
|----------------|-----------------------------------------------------------------------------|
| Structure      | Feature-based, encapsulated                                                 |
| Naming         | PascalCase (components/types), camelCase (vars/functions), `use` prefix for hooks |
| TypeScript     | Explicit types, avoid `any`, strict mode enabled                            |
| React          | Functional components, hooks, early returns                                 |
| shadcn/ui      | Use as primary UI library, follow accessibility best practices              |
| Styling        | Tailwind CSS, theme configuration, minimal custom CSS                       |
| Testing        | Jest + React Testing Library, high coverage, colocated test files           |
| Documentation  | JSDoc, clear comments, up-to-date docs                                     |

---

Following these conventions will help maintain high standards of code quality, accessibility, and reliability throughout the project lifecycle.

