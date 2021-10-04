-- SCHEMA
drop schema if exists public cascade;
create schema public;

-- SEQUENCE
create sequence sq_nl_todo start with 1 increment by 1 no cycle;

-- TABLE
create table nl_todo
(
    id      bigint       not null,
    title   varchar(255) not null,
    content text         not null
);

-- PK
alter table nl_todo
    add primary key (id);

-- UNIQUE
alter table nl_todo
    add constraint u_nl_todo unique (title);
