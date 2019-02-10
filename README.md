# React Project Set Up

## Directory

Create a directory:

`mkdir project-set-up && cd`

Create a basic file structure:

`mkdir src`

Initialize the project:

`npm init`

## Webpack

A tool which bundles javascript files into something the browser can use.
Makes use of "loaders" to convert eg. ES6 into ES5, React jsx into javascript.

Install webpack and its command line tool:

`npm i webpack webpack-cli --save-dev`

Add a webpack build command in the package.json file:
```
"scripts": {
  "build": "webpack --mode production"
}
```

## Babel

Webpack uses babel-loader to transpile code into Javascript, which uses these babel presets:
*babel preset env*: compiles ES6 into ES5
*babel preset react*: compiles jsx into js

Add dependencies:

`npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`

Configure Babel - create a file in the root called `.babelrc` and add:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Tell Webpack to use the babel loader - create a file called webpack.config.js and add:
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

## Write some React

Create App.js:

```
import React, { Component } from 'react';

class App extends Component {
    render() {
        return 'Hello world'
    }
}

export default App;
```

Create Root.js:
```
import React from 'react';
import App from './App'

const Root = () => {

    return (
      <div><App/></div>
    )

};

export default Root;
```

Create index.js:
```
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

ReactDOM.render(<Root />, document.getElementById('root'))
```

## Use Webpack to create a Javascript bundle of our code

`npm run build`

The bundle will be placed in the dist folder.

## Include the bundle in an html file which can be viewed in the browser

Webpack uses an html plugin and loader to make this happen:

`npm i html-webpack-plugin html-loader --save-dev`

Update the Webpack config file:
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

Create a basic html file with a root element:
```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Project Set Up</title>
    </head>
    <body>
        <div id="root">
        </div>
    </body>
</html>
```

Run the Webpack build:

`npm run build`

The dist folder will now include an html file.

Open the html file in the browser and see 'Hello world'.

## Create a development server

Install the webpack dev server package:

`npm i webpack-dev-server --save-dev`

Add a start script to the package.json:
```
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack --mode production"
}
```

Run the application:

`npm start`

---

_With thanks to https://www.valentinog.com/blog/react-webpack-babel/_