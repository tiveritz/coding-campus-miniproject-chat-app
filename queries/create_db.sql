drop database if exists chatapp;
create database chatapp;
use chatapp;

create table messages (
	id int auto_increment primary key,
    username varchar(128) not null,
    message varchar(500) ,
    time timestamp not null default current_timestamp
    );
    




