Create Database City;

Use City;

Create Table city(
	id Int(10) auto_increment primary key,
    name varchar(255) Not null,
    area int(10) Not Null,
    populate int(10) Not Null,
    GDP int(10) Not null,
    describeCity varchar(255) not null
);

alter table city
add column region varchar(255) not null;

insert into city(id,name,area,populate,GDP,describeCity,region) values (1,'Ha Noi',10000,10000,50,'beauty','VietNam');