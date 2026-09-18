Backend setup
-------------

1) Copy `.env.example` to `.env` and fill values (in `backend` folder):

   - `DB_HOST` (e.g., `localhost`)
   - `DB_PORT` (e.g., `3306`)
   - `DB_USER` (MySQL user name)
   - `DB_PASSWORD` (MySQL password)
   - `DB_NAME` (database name — used by app; schema creates `learning_platform` by default)

2) Initialize the database schema (two options):

- Using MySQL client (run from `backend/config`):

```powershell
mysql -u root -p < schema.sql
```

- Or use the provided Node init script which reads `.env` in `backend`:

```powershell
cd backend
npm install
node config/db_init.js
```

3) Start backend:

```powershell
cd backend
npm start
```

Notes:
- `schema.sql` creates a `learning_platform` database by default. You can edit it or create your preferred database name and update `.env` accordingly.
- The `db_init.js` script connects as the user specified in `.env` and runs the SQL; ensure the DB user has privileges to create databases and tables.
- `dotenv` and `mysql2` are used by the init script; these are already listed in `package.json`.

4) Seed initial data (optional):

Using MySQL client:

```powershell
mysql -u root -p learning_platform < config/seed.sql
```

Or with the Node init script you can run the seed file manually after schema is created:

```powershell
cd backend
mysql -u root -p learning_platform < config/seed.sql
```
