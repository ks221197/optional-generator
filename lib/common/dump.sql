{{#mysql}}
CREATE DATABASE boilerplate;

CREATE TABLE `{{database.tblName}}` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
) 
{{/mysql}}

{{#mongodb}}
> show dbs
> use boilerplate
> db.boilerplate.insert({ name: "Park" })
> show collections
{{/mongodb}}

{{#postgresql}}
CREATE DATABASE boilerplate;

CREATE TABLE {{database.tblName}}(
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(50) NOT NULL
);
{{/postgresql}}

