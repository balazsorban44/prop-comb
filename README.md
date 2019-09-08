# prop-comb

Create React components from a given combinations of props.


## Installation

```sh
yarn add prop-comb
# or
npm install prop-comb
```
 

## Usage example

Let's say you use a Button component from a UI library, with specific props all the time.

To avoid declaring the same props everywhere, you have the following options:

1. Modify the global theme, so the default Button has all the styling you need.
   The drawback here is that you can only define one default Button with custom styling.
2. Create a file, that exports different buttons, with hardcoded props on them.
   It may be a better approach, but you still have to iterate over the possible combinations you need manually.

Something like this:
```jsx
// Buttons.js
import {Button} from "your-ui-library"

export const ButtonPrimary = props => <Button color="primary" {...props}/>
export const ButtonLarge = props => <Button size="large" {...props}/>

export const ButtonPrimaryLarge = props => <Button color="primary" size="large" {...props}/>
// or the following, whatever you prefer
export const ButtonLargePrimary = props => <Button size="large" color="primary" {...props}/>
```

This is where `prop-comb` comes into the picture:

```js
// Buttons.js
import {Button} from "your-ui-library"
import propComb from "prop-comb"

export default propComb(Button, {
  color: ["primary"],
  size: ["large"]
})
```


And the component where you would like to use the `Button`

```jsx
import {Button as UIButton} from "your-ui-library"
import Button from "./Buttons" // with prop-comb

import {ButtonPrimary, ButtonPrimaryLarge} from "./Buttons" // without prop-comb

const Component = () => {
  return (
    <div>
      <Button.primary>Primary button</Button.primary>
      <Button.primary.large>Primary large button</Button.primary.large>

      <ButtonPrimary>Primary button</ButtonPrimary>
      <ButtonPrimaryLarge >Primary large button</ButtonPrimaryLarge>
    </div>
  )
}
```

The difference is not huge, but if you use a big combinations of components all the time, it may result in less writing.

`prop-combs` will create all the combinations for you, autmatically.


## Under the hood

> But how can `Button.primary` be both a JSX element, and an object containing other JSX elements at the same time?

The answer is [ES6 Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). **This means, you will only be able to use this module in ES6 environments.**

The `propComb` function works like this:

When you access for example Button.primary, and use it as a JSX Element, it will be called as a function under the hood. This is caught by the `apply()` trap in the Proxy, that will than return a JSX element for you. If you go deeper, and try to get a property by dot notation, the proxy will trap it with `get()`. It does that recursivly, this is how can you go deeper than one "layer".