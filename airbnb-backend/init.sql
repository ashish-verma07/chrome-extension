-- Create database
CREATE DATABASE extension_db;

-- Create user and grant privileges
CREATE USER dluser3 WITH PASSWORD 'dluser3';
GRANT ALL PRIVILEGES ON DATABASE extension_db TO dluser3;

-- Connect to the database
\c test_chrome_extension;

-- Create table
CREATE TABLE saved_search (
    id SERIAL PRIMARY KEY,
    search_key VARCHAR(255),
    property_json JSONB
);