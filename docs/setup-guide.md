# Local Setup Guide (No Docker)

This guide walks you through installing everything directly on your machine. Pick the section for your OS.

## 1. Prerequisites — Install These First

| Tool                         | Version   | Purpose                            |
|------------------------------|-----------|------------------------------------|
| Git                          | 2.40+     | Version control                    |
| Node.js                      | 20 LTS    | Frontend                           |
| Python                       | 3.11      | Backend + ML                       |
| PostgreSQL                   | 16        | Database                           |
| PostGIS                      | 3.4       | Spatial extension for PostgreSQL   |
| Redis                        | 7         | Cache                              |
| VS Code                      | Latest    | Recommended IDE                    |

### Windows

1. **Git** — https://git-scm.com/download/win
2. **Node.js 20** — https://nodejs.org/ (LTS installer)
3. **Python 3.11** — https://www.python.org/downloads/windows/
   - ✅ Check "Add Python to PATH" during install
4. **PostgreSQL 16 + PostGIS** — https://www.postgresql.org/download/windows/
   - Use the EnterpriseDB installer; during install, run Stack Builder and add **PostGIS** under Spatial Extensions
5. **Redis** — https://github.com/microsoftarchive/redis/releases (Redis-x64 msi) or use Memurai: https://www.memurai.com/get-memurai
6. **VS Code** — https://code.visualstudio.com/

### macOS

```bash
# Install Homebrew if needed: https://brew.sh/
brew install git node@20 python@3.11 postgresql@16 postgis redis
brew services start postgresql@16
brew services start redis
```

### Ubuntu / Linux

```bash
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python 3.11
sudo apt-get install -y python3.11 python3.11-venv python3-pip

# PostgreSQL 16 + PostGIS
sudo apt-get install -y postgresql-16 postgresql-16-postgis-3

# Redis
sudo apt-get install -y redis-server

# GIS system libraries (needed by GeoPandas/Rasterio)
sudo apt-get install -y gdal-bin libgdal-dev libgeos-dev libproj-dev libpq-dev

# Start services
sudo systemctl start postgresql
sudo systemctl start redis-server
```

### Recommended VS Code Extensions

Install these inside VS Code:
- Python (ms-python.python)
- Pylance
- Ruff (charliermarsh.ruff)
- ESLint
- Prettier
- GitLens
- Jupyter

## 2. Create the Database

Open a terminal and run `psql`:

```bash
# Windows / Mac / Linux
psql -U postgres
```

Inside the psql prompt:

```sql
CREATE USER flood_user WITH PASSWORD 'your-strong-password';
CREATE DATABASE manila_flood OWNER flood_user;
\c manila_flood
CREATE EXTENSION IF NOT EXISTS postgis;
SELECT PostGIS_Version();   -- should print a version number
\q
```

Update your `.env` file with the password you just set.

## 3. Clone and Configure the Project

```bash
git clone https://github.com/<your-org>/manila-flood-forecast.git
cd manila-flood-forecast
cp .env.example .env
```

Open `.env` and update:
- `POSTGRES_PASSWORD` — the one you set in step 2
- `DATABASE_URL` — update the password to match

## 4. Start the Backend

Open a terminal:

```bash
cd backend
python -m venv venv

# Activate the virtual environment:
source venv/bin/activate         # macOS / Linux
venv\Scripts\activate            # Windows PowerShell

pip install --upgrade pip
pip install -r requirements.txt

uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Visit http://localhost:8000/docs — you should see the interactive API docs.

## 5. Start the Frontend

Open a **second** terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The Vite dev server starts on http://localhost:3000 with hot module reload. You should see the landing page with three cards.

If the "API online" badge in the header is red, the frontend cannot reach the backend — verify the backend is running on port 8000 and check `VITE_API_URL` in `frontend/.env`.

## 6. Start MLflow (optional, for experiments)

Open a **third** terminal:

```bash
cd ml
python -m venv venv
source venv/bin/activate         # or venv\Scripts\activate on Windows
pip install -r requirements.txt
mlflow ui --backend-store-uri sqlite:///mlflow.db
```

Visit http://localhost:5000.

## 7. Install Pre-commit Hooks (once)

```bash
cd manila-flood-forecast            # project root
pip install pre-commit
pre-commit install
```

Now every time you `git commit`, ruff and prettier will auto-format your code.

## 8. Verify Everything Works

- Backend: `curl http://localhost:8000/health` → `{"status":"ok"}`
- Frontend: http://localhost:3000 loads the landing page
- Database: `psql -U flood_user -d manila_flood -c "SELECT PostGIS_Version();"`
- Redis: `redis-cli ping` → `PONG`
- MLflow: http://localhost:5000 loads

## Common Issues

### "port already in use"
Something else is using 3000 / 8000 / 5432 / 6379. Find and stop it, or change the port in `.env` and restart.

### "GDAL errors during pip install"
- **macOS:** `brew install gdal`
- **Ubuntu:** `sudo apt install libgdal-dev`
- **Windows:** install OSGeo4W from https://trac.osgeo.org/osgeo4w/

### "psycopg2 install fails on Windows"
Use `psycopg2-binary` (already in `requirements.txt`). If it still fails, install the PostgreSQL dev tools or use `pip install psycopg[binary]`.

### "PostGIS extension does not exist"
Connect as the `postgres` superuser (`psql -U postgres -d manila_flood`) and run `CREATE EXTENSION postgis;` there, since only superusers can create extensions.

### Redis isn't running on Windows
Memurai runs as a Windows service — check `services.msc`. Or use WSL2 and install Redis inside Ubuntu.

## Getting Data

Raw data is NOT in the repo (too large). Place files here:

```
ml/data/raw/pagasa/          PAGASA rainfall records (.csv)
ml/data/raw/radar/           Radar reflectivity grids (.nc or .h5)
gis/layers/elevation_dem.tif DEM from USGS or PhilGIS
gis/layers/land_use.geojson  Land cover classification
gis/layers/drainage_network.geojson  City drainage map
```

Sources:
- [PAGASA Climate Data](https://www.pagasa.dost.gov.ph/climate)
- [PhilGIS Free GIS Data](http://philgis.org/)
- [USGS EarthExplorer](https://earthexplorer.usgs.gov/) for DEM
- [OpenStreetMap](https://www.openstreetmap.org/) for drainage and land use

## Daily Workflow

After first-time setup, starting the project is just:

```bash
# Terminal 1 — backend
cd backend && source venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2 — frontend
cd frontend && npm run dev

# Terminal 3 (optional) — MLflow
cd ml && source venv/bin/activate && mlflow ui
```

On Windows replace `source venv/bin/activate` with `venv\Scripts\activate`.
