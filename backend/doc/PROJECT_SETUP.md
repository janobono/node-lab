# Node Lab Backend - Project setup

## Init project
```
npm init -y
```

## TypeScript
```
npm i -D typescript
```

### Config
```
npx tsc --init
```
generated `tsconfig.json` more info [here](https://www.typescriptlang.org/docs/handbook/compiler-options.html)


## Install Express
```
npm i -S express
```
```
npm i -D @types/express
```

## Nodemon
```
npm i -D nodemon ts-node
```
created `nodemon.json` more info [here](https://github.com/remy/nodemon#nodemon)

## ESLint
```
npm i -D eslint
```

### Config
```
npx eslint --init

How would you like to use ESLint?
To check syntax, find problems, and enforce code style.
What type of modules does your project use?
JavaScript modules (import/export)
Which framework does your project use?
None of these
Does your project use TypeScript?
Yes
Where does your code run?
Node
How would you like to define a style for your project?
Use a popular style guide
Which style guide do you want to follow?
Standard
What format do you want your config file to be in?
JSON
Would you like to install them now with npm?
Yes
```

## Prettier
```
npm install --save-dev --save-exact prettier
```
[docs](https://prettier.io/docs/en/install.html) 

## Dotenv
```
npm i -D dotenv
```
package needed to use `.env` file

## Winston
```
npm i -S winston @types/winston
```
[docs](https://github.com/winstonjs/winston)

## Body Parser
```
npm i -S body-parser 
```
```
npm i -D @types/body-parser
```

## Pg
```
npm i -S pg
```

```
npm i -D @types/pg
```
