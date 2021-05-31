# pet-finder
For a challenge

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-07405E?style=for-the-badge&logo=typeorm&logoColor=white)

### Yarn
 ```
yarn
```
to install all dependences
 ```
 yarn start
 ```
 to start the application after install the dependences
 ```
 yarn typeorm migrations:run
 ```
 to create tables in SQLite DB 
### NPM
```
npm install
```
to install all dependences
```
npm run start
```
 to start the application after install the dependences**
  ```
 npm run typeorm migrations:run
 ```
 to create tables in SQLite DB
 
 # Routes
 ### User
 ```
 body JSON:
 {
  "name": "barbara",
	"email":"barbara@email.com",
	"password":"barbara123!"
 }
 ```
  ```
 http://localhost:3333/users POST: Create User
 ```
 ```
 http://localhost:3333/users/id GET: List Specific User
 ```
  ```
 http://localhost:3333/users GET: List All Users
 ```
 ```
 http://localhost:3333/users/id PUT: Update User
 ```
  ```
 http://localhost:3333/users/id DELETE: Delete User
 ```
 ```
 http://localhost:3333/sessions POST: To Login and create a token
 ```
 ```
 http://localhost:3333/pets/user-pets/userId GET: Get all pets from an user
 ```

 ### Pets
 ```
 http://localhost:3333/users POST: Create user
 body JSON:
{
	"name": "caramelo",
"breed":"vira lata",
"age":7,
 "weight":14,
 "city": "rio de janeiro",
 "state": "RJ",
 "isAdopted": 1
}
 ```
  ```
 http://localhost:3333/pets POST: Create Pet
 ```
 ```
 http://localhost:3333/pets/id GET: List Specific PEt
 ```
  ```
 http://localhost:3333/pets GET: List All Pets
 ```
 ```
 http://localhost:3333/pets/id PUT: Update Pet
 ```
  ```
 http://localhost:3333/pets/id DELETE: Delete Pet
 ```
