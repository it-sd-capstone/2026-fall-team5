# MealDeal

MealDeal is a website for planning meals, tracking nutrition facts, creating recipes, and building grocery lists. Users plan breakfast, lunch, and dinner for Monday through Friday. Anyone can browse recipes without an account. Creating an account lets users save recipes, meal plans, and grocery lists. The site is built with Node.js and Express on the server and PostgreSQL for data storage.

## Installation

### Requirements

- [Node.js](https://nodejs.org/) 20 or newer (includes npm)
- [PostgreSQL](https://www.postgresql.org/download/) 14 or newer
- [Git](https://git-scm.com/) and [Visual Studio Code](https://code.visualstudio.com/)

### Steps

1. Clone the repository and open the folder in Visual Studio Code:

   ```
   git clone https://github.com/<organization>/2026-fall-team5.git
   cd 2026-fall-team5
   code .
   ```

2. Open a terminal in Visual Studio Code and install the dependencies:

   ```
   npm install
   ```

3. Create the PostgreSQL database named `mealdeal`:

   ```
   createdb -U postgres mealdeal
   ```

4. Copy the example environment file to a new file named `.env` in the project's root folder (the same folder as `package.json`):

   ```
   cp .env.example .env
   ```

5. Open `.env` and set the values for your PostgreSQL server. The `.env` file is ignored by Git, so your password is never committed.

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=mealdeal
   PORT=3000
   ```

6. Create the database tables from `database/schema.sql`:

   ```
   npm run db:init
   ```

## Testing

### Automated tests

The automated tests confirm that Node.js can connect to PostgreSQL, write and read data, and that the Express server reports a working database connection. PostgreSQL must be running and `.env` must be configured first.

```
npm test
```

Expected result: three passing tests and zero failures.

### Manual tests

Start the server with `npm start`, then open http://localhost:3000.

| # | Steps | Expected result |
|---|-------|-----------------|
| 1 | Open http://localhost:3000/api/health | The page shows `{"status":"ok","database":"connected", ...}` |
| 2 | Open http://localhost:3000 | The MealDeal home page loads with its styling |
| 3 | Open http://localhost:3000/recipes.html | The Recipe Library page loads |
| 4 | Open http://localhost:3000/meal-planner.html | The Weekly Meal Planner page loads |
| 5 | Open http://localhost:3000/grocery-list.html | The Grocery List page loads |
| 6 | Open http://localhost:3000/register.html and http://localhost:3000/login.html | Both account pages load with their forms |

Account, recipe, meal plan, and grocery list features will be added to this table as they are connected to the database.

## Usage

### Run locally

1. Make sure PostgreSQL is running.
2. Start the server:

   ```
   npm start
   ```

3. Open http://localhost:3000 in a web browser.

For development, `npm run dev` restarts the server automatically when a file changes.

### Live website

MealDeal is hosted at: https://mealdeal-jid8.onrender.com/

When deploying to [Render](https://render.com/), create a PostgreSQL database and a Web Service from this repository, then set these values:

- Build command: `npm install`
- Start command: `npm start`
- Environment variable `DATABASE_URL`: the PostgreSQL connection URL that Render provides
