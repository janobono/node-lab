-- SCHEMA
drop schema if exists public cascade;
create schema public;

-- TABLE
create table nl_todo
(
    id      serial       not null,
    title   varchar(255) not null,
    content text         not null
);

create table nl_user
(
    username   varchar(255)  not null,
    password   varchar(1024) not null,
    first_name varchar(255)  not null,
    last_name  varchar(255)  not null,
    email      varchar(255)  not null
);

-- PK
alter table nl_todo
    add primary key (id);
alter table nl_user
    add primary key (username);

-- UNIQUE
alter table nl_todo
    add constraint u_nl_todo unique (title);
alter table nl_user
    add constraint u_nl_user unique (email);

-- DATA
insert into nl_todo (title, content)
values ('test01', 'Just test TODO - 1');
insert into nl_todo (title, content)
values ('test02', 'Just test TODO - 2');

insert into nl_user (username, password, first_name, last_name, email)
values ('jimbop', '$2a$12$wWa8P0wPNm1.JLTP5Yavnu0xnp1tMT4Bqt2NI7eJJmyIM671MI0ki', 'Jimbo', 'Pytlik',
        'jimbo.pytlik@anymail.org');
