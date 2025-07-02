# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

I need to clearly understand what my project looks like

*Session: 40ef208d30c671b65422344cdfe723ea | Generated: 7/2/2025, 3:55:37 PM*

### Analysis Summary

# Project Structure Overview

The project, **EnerProject**, is organized into two main components: `backend` and `frontend`, indicating a client-server architecture.

## Backend (node:backend)
The `backend` directory contains a Node.js application, likely built with TypeScript, given the `.ts` file extensions and `tsconfig.json`. It follows a typical MVC-like (Model-View-Controller) or layered architecture, with clear separation of concerns.

### Key Sub-components of Backend:

*   **`src/config` (node:backend_config)**: This directory holds configuration files for the backend application.
    *   `config.ts` (file:backend/src/config/config.ts): Likely contains general application settings.
    *   `database.ts` (file:backend/src/config/database.ts): Expected to handle database connection and configuration.
*   **`src/controllers` (node:backend_controllers)**: This component is responsible for handling incoming requests, processing them by interacting with models, and sending back responses. There are numerous controllers, each seemingly dedicated to a specific domain or feature, such as `billingController`, `projectController`, `userController`, etc. This suggests a modular design where different business functionalities are managed by distinct controllers.
*   **`src/middlewares` (node:backend_middlewares)**: Contains middleware functions that process requests before they reach the controllers.
    *   `jwtAuthMiddleware.ts` (file:backend/src/middlewares/jwtAuthMiddleware.ts): Implies the use of JSON Web Tokens for authentication.
    *   `schemaMiddleware.ts` (file:backend/src/middlewares/schemaMiddleware.ts): Suggests request validation based on defined schemas.
*   **`src/models` (node:backend_models)**: This component defines the data structures and business logic for the application. Each model (e.g., `billingModel`, `projectModel`, `userModel`) corresponds to a specific entity or resource, interacting with the database.
*   **`src/routes` (node:backend_routes)**: This component defines the API endpoints and maps them to the respective controller functions. Each controller has a corresponding routes file (e.g., `billingRoutes.ts` for `billingController`).
*   **`src/schemas` (node:backend_schemas)**: This directory likely contains validation schemas (e.g., using a library like Joi or Yup) for incoming request bodies, ensuring data integrity.
*   **`src/types` (node:backend_types)**: Contains TypeScript type definitions, such as `documentalTypes.ts`, for better code organization and type safety.
*   **`src/utils` (node:backend_utils)**: This component provides utility functions that can be reused across the application.
    *   `getNextProjectSequence.ts` (file:backend/src/utils/getNextProjectSequence.ts): Suggests a mechanism for generating unique project identifiers.
    *   `jwt.ts` (file:backend/src/utils/jwt.ts): Likely handles JWT token generation and verification.
*   **`app.ts` (file:backend/src/app.ts)**: This file is typically the main application setup file, where middleware is configured, routes are registered, and the application instance is created.
*   **`index.ts` (file:backend/src/index.ts)**: The entry point of the backend application, responsible for starting the server.

## Frontend (node:frontend)
The `frontend` directory contains a React application, indicated by `.tsx` files and `vite.config.ts` (suggesting Vite as the build tool).

### Key Sub-components of Frontend:

*   **`src/components` (node:frontend_components)**: This component contains reusable UI components.
    *   `LoginForm.tsx` (file:frontend/src/components/LoginForm.tsx): A component for user authentication.
    *   `ProjectForm.tsx` (file:frontend/src/components/ProjectForm.tsx): A component for creating or editing project details.
    *   `ProjectTable.tsx` (file:frontend/src/components/ProjectTable.tsx): A component for displaying project data in a tabular format.
*   **`src/context` (node:frontend_context)**: This component utilizes React Context API for state management.
    *   `AuthContext.tsx` (file:frontend/src/context/AuthContext.tsx): Manages authentication-related state (e.g., user login status, tokens).
    *   `ProjectContext.tsx` (file:frontend/src/context/ProjectContext.tsx): Manages project-related state, likely for sharing project data across different components.
*   **`src/pages` (node:frontend_pages)**: This component contains the main views or pages of the application.
    *   `Dashboard.tsx` (file:frontend/src/pages/Dashboard.tsx): The main landing page after login.
    *   `LoginPage.tsx` (file:frontend/src/pages/LoginPage.tsx): The user login interface.
    *   `PhaseDetail.tsx` (file:frontend/src/pages/PhaseDetail.tsx): Displays details for a specific project phase.
    *   `ProjectDetail.tsx` (file:frontend/src/pages/ProjectDetail.tsx): Displays detailed information about a specific project.
*   **`src/services` (node:frontend_services)**: This component handles communication with the backend API.
    *   `AuthService.ts` (file:frontend/src/services/AuthService.ts): Manages authentication requests to the backend.
    *   `ProjectService.ts` (file:frontend/src/services/ProjectService.ts): Handles requests related to project data.
*   **`src/styles` (node:frontend_styles)**: Contains CSS files for styling the application.
*   **`src/types` (node:frontend_types)**: Contains TypeScript type definitions for frontend data structures, such as `project.ts` and `user.ts`.
*   **`App.tsx` (file:frontend/src/App.tsx)**: The root component of the React application, typically responsible for routing and overall layout.
*   **`main.tsx` (file:frontend/src/main.tsx)**: The entry point of the React application, where the root component is rendered into the DOM.

## Overall Relationships:
The `frontend` interacts with the `backend` through API calls. The `frontend/src/services` directory (e.g., `AuthService.ts`, `ProjectService.ts`) is responsible for making these calls to the `backend/src/routes` (which are handled by `backend/src/controllers` and process data using `backend/src/models`). Authentication is handled via JWT, with `frontend/src/context/AuthContext.tsx` managing the client-side authentication state and `backend/src/middlewares/jwtAuthMiddleware.ts` enforcing authentication on the server-side.

### Implementation Steps

1. **Understanding the Overall Project Architecture**
   The project, `EnerProject`, is structured as a client-server application, divided into two primary components: a `backend` and a `frontend`. This architecture allows for clear separation of concerns, with the `frontend` handling the user interface and the `backend` managing data and business logic.

2. **Exploring the Backend Component**
   The `backend` component is a Node.js application, likely built with TypeScript, following a layered or MVC-like architecture. It is responsible for handling API requests, processing data, and interacting with the database. Key internal parts include `config` for application settings, `controllers` for request handling, `middlewares` for request processing, `models` for data structures and business logic, `routes` for API endpoint definitions, `schemas` for data validation, `types` for TypeScript definitions, and `utils` for reusable functions. The `app.ts` file sets up the application, and `index.ts` is the entry point.

3. **Exploring the Frontend Component**
   The `frontend` component is a React application, responsible for the user interface and user interaction. It uses Vite for building. Its main sub-components include `components` for reusable UI elements, `context` for managing application state using React's Context API, `pages` for defining the main views, `services` for handling communication with the `backend` API, `styles` for styling, and `types` for frontend data definitions. `App.tsx` is the root component, and `main.tsx` is the application's entry point.

4. **Understanding the Overall Relationships and Core Functionalities**
   The `frontend` and `backend` interact through API calls. Specifically, the `frontend`'s `services` (e.g., `AuthService`, `ProjectService`) are responsible for making these calls to the `backend`'s `routes`. These `routes` are then handled by the `backend`'s `controllers`, which process the requests and interact with the `models` to manage data. Authentication is managed using JSON Web Tokens (JWT), with the `frontend`'s `AuthContext` handling client-side state and the `backend`'s `jwtAuthMiddleware` enforcing server-side authentication.

