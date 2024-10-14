# International Holidays

## Overview

This Nuxt 3 application allows users to search for countries, display three random countries with details about their next holiday, and show holiday details for a selected country based on the chosen year. The application is built using Vue.js and utilizes various libraries for improved functionality and code quality.

## Features

- **Country Search:** Users can search for countries from a provided list.
- **Random Country Display:** Shows details about three randomly selected countries and their upcoming holidays.
- **Holiday Details:** Provides detailed information about holidays in the selected country for a specified year.

## Architecture

The application follows the Nuxt.js architecture, leveraging the Vue Composition API for state management and component structure. The application uses the following libraries and frameworks:

- **Nuxt 3:** The main framework for building the application.
- **Vue:** The underlying JavaScript framework.
- **Vue Router:** For handling routing within the application.
- **Bootstrap:** For styling and responsive design (via `usebootstrap`).
- **ESLint and Prettier:** For maintaining code quality and formatting consistency.

## Installation
 **Copy the Environment Variables File:**
   Make a copy of the `.env.example` file and rename it to `.env`. This file contains the necessary environment variables for the application to run correctly.

   ```bash
   cp .env.example .env

To install the dependencies, run the following command:

```bash
npm install

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

 
```

## Production

Build the application for production:

```bash
# npm
npm run build

```

Locally preview production build:

```bash
# npm
npm run preview

```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
