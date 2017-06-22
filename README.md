# ReactJS-mixin

[![Greenkeeper badge](https://badges.greenkeeper.io/dcos/reactjs-mixin.svg)](https://greenkeeper.io/)
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

## License and Author

Copyright 2016 Mesosphere, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this repository except in compliance with the License.

The contents of this repository are solely licensed under the terms described in the [LICENSE file](./LICENSE) included in this repository.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
