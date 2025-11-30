-- Run these commands in PostgreSQL (psql or pgAdmin)

-- 1. Create database
CREATE DATABASE onlyfunds_db;

-- 2. Create user (OPTIONAL - for production security)
CREATE USER onlyfunds_user WITH PASSWORD 'your_secure_password_here';

-- 3. Grant privileges to user
GRANT ALL PRIVILEGES ON DATABASE onlyfunds_db TO onlyfunds_user;

-- 4. Connect to the database
\c onlyfunds_db

-- 5. Grant schema privileges
GRANT ALL ON SCHEMA public TO onlyfunds_user;

-- Then update application.properties with:
-- spring.datasource.username=onlyfunds_user
-- spring.datasource.password=your_secure_password_here
