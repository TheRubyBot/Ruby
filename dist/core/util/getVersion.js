var t=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var d=e=>t(e,"__esModule",{value:!0});var b=(e,n)=>{for(var r in n)t(e,r,{get:n[r],enumerable:!0})},v=(e,n,r,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of g(n))!u.call(e,i)&&(r||i!=="default")&&t(e,i,{get:()=>n[i],enumerable:!(o=p(n,i))||o.enumerable});return e};var f=(e=>(n,r)=>e&&e.get(n)||(r=v(d({}),n,1),e&&e.set(n,r),r))(typeof WeakMap!="undefined"?new WeakMap:0);var j={};b(j,{default:()=>E});var a=require("fs-extra"),E=()=>{const e=(0,a.readJSONSync)("package.json"),[n,r,o]=e.version.split(".").map(l=>parseInt(l)),{revision:i,codename:m,channel:c}=e;let s=`${n}.${r}`;return o!==0&&(s+=`.${o}`),process.env.NODE_ENV==="DEVELOPMENT"&&(s+=`.${i}-dev`),{major:n,minor:r,build:o,revision:i,codename:m,channel:c||"Release",string:s}};module.exports=f(j);0&&(module.exports={});
//# sourceMappingURL=getVersion.js.map
