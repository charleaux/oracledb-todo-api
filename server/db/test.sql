alter session set container=ORCL;
drop user planapp4;
create user planapp4 identified by ********;
grant connect to planapp4;
GRANT
CREATE ANY SYNONYM
, CREATE CLUSTER
, CREATE INDEXTYPE
, CREATE PROCEDURE
, CREATE SEQUENCE
, CREATE SESSION
, CREATE TABLE
, CREATE TRIGGER
, CREATE TYPE
, CREATE VIEW
, DROP ANY SYNONYM
, UNLIMITED TABLESPACE
TO planapp4;
grant resource to planapp4;