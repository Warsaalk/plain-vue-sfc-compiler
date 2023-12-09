# A simple Vue SFC compiler
A simple compiler that translates Vue Single-File Components into plain JavaScript modules. Making them easier to debug than other compilers.

## Usage

```javascript
import { compileSFCs } from 'plain-vue-sfc-compiler';

await compileSFCs('src/', 'dist/', {
    globalCssFile: 'dist/css/global.css', 
    useRawTemplate: true, 
    minify: true
});
```

### Options

|    Option     |                 Values                 |                                                                                                        Description                                                                                                        | 
|:-------------:|:--------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| globalCssFile |         `dist/[filename].css`          |                                                                         The path to the CSS file in which the compiler should add the module CSS                                                                          |
|       useRawTemplate  |           `true` or `false`            | By default the compiler will compile the HTML template into a Vue render function. By setting this option to true the compiler will use the `.template` property on the component instead an assign the HTML code itself. |                                                                          |
| minify |           `true` or `false`            |         By default the compiler component code is not minified, allowing easier debugging. By setting this option to true the outputted component code will be minified, this option is meant for production use.         |

### Important
It's important to run this compiler after you've process other JavaScript files and ideally before copying libraries.
The compiler will look for the `.vue` extension in `.js` files to replace it with the `.vue.js` output extension of this compiler.