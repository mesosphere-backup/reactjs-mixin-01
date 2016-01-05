## reactjs-mixin
A mixin util for React 0.13+

## Usage
Install:
```bash
  npm install --save reactjs-mixin
```

Use:
```js
  import mixin from "reactjs-mixin";

  import Mixin1 from "./Mixin1";
  import Mixin2 from "./Mixin2";
  
  class Table extends mixin(Mixin1, Mixin2) {
    ...
  }
```
Reactjs-mixin extends from `React.Component` along with the mixins that are passed in.
