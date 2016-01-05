# ReactJS-mixin
A mixin util for React 0.13+

## Using the mixin util
1. Install:
  ```bash
  
    npm install --save reactjs-mixin
  ```

2. Use:
  ```js
    import mixin from "reactjs-mixin";
  
    import Mixin1 from "./Mixin1";
    import Mixin2 from "./Mixin2";
    
    class Table extends mixin(Mixin1, Mixin2) {
      // Reactjs-mixin extends from React.Component, providing React methods.
      render() {
        return (
          ...
        );
      }
    }
  ```
