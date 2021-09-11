-- Create Role: perrnguser
-- DROP ROLE perrnguser;

CREATE ROLE perrnguser WITH
  LOGIN
  SUPERUSER
  INHERIT
  CREATEDB
  CREATEROLE
  REPLICATION
  ENCRYPTED PASSWORD 'md5b4f1d5207278e396a6899040e49af8df';

GRANT postgres TO perrnguser WITH ADMIN OPTION;

-- Drops the DB if it exists currently --
DROP DATABASE IF EXISTS "perrng-app";
-- Creates the DB --
CREATE DATABASE "perrng-app"
    WITH 
    OWNER = perrnguser
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
