# TastyBites app
Frontend Technical Assessment Instructions
Objective: The purpose of this assessment is to evaluate your technical skills, problem-solving
abilities, and overall approach to developing a front-end solution.
Task: You are expected to design and implement a user-centric, responsive, and functional web
application using the front-end technology of your choice.
What We’re Looking For:
• Clean and maintainable code
• A thoughtful and user-friendly design
• Responsiveness across devices
• Functionality that meets the project’s objectives
• Thorough test coverage

# Tasks
## 1. Develop a small front-end application that fulfills the following requirements:
Scenario: Build a "Recipe Finder" application where users can:
- Search for recipes by entering ingredients or keywords.
- View a list of matching recipes with basic details (e.g., name, short description,
and image).
- Click on a recipe to view detailed information, including ingredients,
instructions, and preparation time.
- Save favorite recipes to a local list for easy access.
## 2. Core Functionalities:
- Display an interactive and visually appealing interface.
- Allow users to search for recipes and display results dynamically.
- Maintain the application state in the browser (e.g., using local storage or in-
memory state management).
- Provide error handling for invalid or empty searches.
- use real working APIs to retrieve recipes https://www.themealdb.com/api.php
## 3. Design Expectations:
- The interface should be user-friendly and responsive (works well on both
desktop and mobile devices).
- Use proper styling to ensure good visual hierarchy and accessibility.
- The design does not need to be overly complex but should reflect good UI/UX
Practices.

# Tech Stack
- Frontend: React/typescript (NextJs), shadcn/ui, Tailwind v3.4.17 (theme green/orange)
- Backend: no needed, poc app
- api: https://www.themealdb.com/api.php
- use axios
- use tanstackquery
- use `tailwind.config.ts` to handle themes

# PLANNING.md
Purpose: High-level vision, architecture, constraints, tech stack, tools, etc.
Prompt to AI: “Use the structure and decisions outlined in PLANNING.md.”
Have the LLM reference this file at the beginning of any new conversation.


# TASK.md
Purpose: Tracks current tasks, backlog, and sub-tasks.
Includes: Bullet list of active work, milestones, and anything discovered mid-process.
Prompt to AI: “Update TASK.md to mark XYZ as done and add ABC as a new task.”
Can prompt the LLM to automatically update and create tasks as well (through global rules).