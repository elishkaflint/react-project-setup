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

## Styled Components

[Styled Components](https://www.styled-components.com/) provides a nice way to apply CSS to components in React.

`npm i styled-components --save-dev`

Create a styled button and use props to create different styles:

```javascript
import styled, { css } from 'styled-components';

const Button = styled.button`
    color: red;

    ${props => props.primary && css`
        background: blue;
        color: white;
    `}
`;
```

Then use the button as a normal component:

`<Button primary>Button</Button>`

Note that ``` props => props.primary && css`...` ``` is the same as ``` props => props.primary ? css`...` : "" ```

The ``` css`...` ``` syntax is a 'tagged template literal', a type of function call.


## Storybook

[Storybook](https://storybook.js.org/) is a great tool for creating and documenting design of various features in your application.

`npm i --save-dev @storybook/react`

Add the storybook script to your package.json:

```
{
  "scripts": {
    "storybook": "start-storybook -p 9001 -c .storybook"
  }
}
```

Create a config file:

```
mkdir .storybook
cd .storybook
touch config.js
```

```javascript
// in config.js

import { configure } from "@storybook/react";

const req = require.context("../src", true, /\.stories\.js$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

```

Write your "stories":

Our config means that Storybook will pick up any file ending .stories.js

```javascript
// in Button.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';

storiesOf('Button', module)
    .add('Normal button', () => ( <Button>Button</Button>))
    .add('Primary button', () => ( <Button primary>Button</Button>));
```

Run storybook:

`npm run storybook`

---

_With some help from https://www.valentinog.com/blog/react-webpack-babel/_