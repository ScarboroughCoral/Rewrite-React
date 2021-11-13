/* eslint-disable react/style-prop-object */
/** @jsxRuntime classic */
import { X } from './lib'
// @jsx X.createElement
const element = (
  // @ts-expect-error
  <div style="background: salmon">
    <h1>Hello World</h1>
    <h2 
    
    // @ts-expect-error
    style="text-align:right">from X</h2>
  </div>
);

X.render(element, document.getElementById('root'))