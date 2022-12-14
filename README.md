# MoleCuul

![CI Badge](https://github.com/dantheman8300/MoleCuul/actions/workflows/node.js.yml/badge.svg)
![CD Badge](https://github.com/dantheman8300/MoleCuul/actions/workflows/main_molecuulapi.yml/badge.svg)

<b> Anthony Bui | Tyler Herzog | Emelia Ortiz | Daniel Leavitt </b>

## Project Vision
**For** *students* **Who** *need to learn about chemical structures of molecules* **The** *MoleCuul* **is a** *web application* **That** *lets students practice building molecules* **Unlike** *Molview* **Our Product** *can prompt students to build specific molecules that have been specifically tailored by their professors*.

## UI Prototype
[Figma](https://www.figma.com/file/9NGrI4G5viBJrBtN48aiTy/MoleCuul-Web-Interface?t=nQaA5YCxFzoJf6L9-1)

## Development environment setup
1. Nagivate to backend directory - run `cd molecuul-backend`
2. Run `npm install`
3. Create .env file in the  molecuul-backend directory containing the following:
    ```
    MONGO_USER=
    MONGO_PWD=
    MONGO_DB=
    MONGO_CLUSTER=
    ```
4. Run `npm run dev` to start backend server
5. Open a new terminal
6. Navigate to frontend directory - run `cd molecuul-frontend`
7. Run `npm install`
8. Run `npm start` to run frontend server
9. Navigate to http://localhost:3000

## Diagrams

[Class Diagrams](https://github.com/dantheman8300/MoleCuul/wiki/Class-diagram)\
[Use case diagrams](https://github.com/dantheman8300/MoleCuul/wiki/Use-case-diagram)
