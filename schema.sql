create table tasks(
id integer primary key Auto_increment,
title varchar(20) not null,
status varchar(10) check(status in ('OPEN','INPROGRESS','CLOSED')) not null,
description  varchar(200),
created_at date not null,
updated_at date not null,
image1name varchar(200),
image1url varchar(255),
image2name varchar(200),
image2url varchar(255)
);