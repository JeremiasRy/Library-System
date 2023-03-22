# Library System

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

* Frontend: SASS, TypeScript, React, Redux Toolkit
* Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

## How to get it running

First install all dependencies: `dotnet restore`, `npm install`
You'll need to have postgres on your local machine and create an empty database. Then in the appsettings of the backend project include a default connections string pointing to this database. <br/>Next you want to update the database using the Ef command `dotnet ef database update`. When running the backend check the localhost address and add that to frontends `src/redux/redusers/baseActions.ts` baseUrl constant. Then in backends program.cs add a cors policy to the frontends localhost address

## About the project

It's a imaginary library system. You can make loans from copies of books. It has user functions with JWTauthorization and different admin functions separated from customer functions. There are still lot's to improve on my base design. I made all the styling in frontend by myself using SASS.
