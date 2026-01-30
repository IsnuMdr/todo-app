# Todo App

> A Todo application built with React, Vite, and TypeScript. Features authentication, todo and subtodo management, and a modern UI using Material UI.

---

## 🚀 Features

- **Authentication**: Login with Google, protected routes.
- **Todo Management**: Add, edit, delete todos & subtodos.
- **Date Picker**: Easily select deadlines.
- **Modern UI**: Built with Material UI and custom components.
- **Persistent Storage**: Data is saved in localStorage or Supabase.

---

## 🛠️ Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/IsnuMdr/todo-app.git
cd todo-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app**

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

- **Environment Variables**: The app now uses environment variables for configuration. Create a `.env` file in the root directory and set the required variables (see `.env.example` if available). You will need to provide keys such as Supabase credentials and your Google OAuth client ID.
- **Port**: Default Vite port is 5173. Change in `vite.config.ts` if needed.
- **Main dependencies**:
  - React, React DOM
  - TypeScript
  - Vite
  - Material UI (`@mui/material`, `@mui/x-date-pickers`, `@emotion/react`, `@emotion/styled`)
  - dayjs

### Google Authentication

To enable Google authentication, set up a Google OAuth client and add the client ID to your `.env` file. The app uses Google Sign-In for user authentication. Users can log in with their Google accounts.

---

## 📁 Folder Structure

```
src/
  components/      # UI components & logic
  contexts/        # Context API (Auth, Todo, Toast)
  hooks/           # Custom hooks
  layouts/         # Page layouts
  pages/           # Main pages (Login, Todos)
  services/        # Service logic (Auth, Todo, Storage)
  types/           # TypeScript types
  utils/           # Helpers & validation
```

---

## 🧑‍💻 Development

- **Add Features**: Add components in `src/components` or pages in `src/pages`.
- **State Management**: Use Context API (`src/contexts`).
- **Validation**: Add schemas in `src/utils/validationSchemas.ts`.
- **Testing**: (Optional) Add tests as needed.
  },
  },
  ])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
