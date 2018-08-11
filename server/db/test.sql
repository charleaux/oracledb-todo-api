alter session set container=ORCL;
drop user user1;
create user user1 identified by user1password;
grant connect to user1;
grant create session to user1;
grant unlimited tablespace to user1;