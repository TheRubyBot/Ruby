var m=Object.defineProperty;var e=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var l=o=>m(o,"__esModule",{value:!0});var s=(o,t)=>{for(var n in t)m(o,n,{get:t[n],enumerable:!0})},C=(o,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of p(t))!c.call(o,i)&&(n||i!=="default")&&m(o,i,{get:()=>t[i],enumerable:!(a=e(t,i))||a.enumerable});return o};var d=(o=>(t,n)=>o&&o.get(t)||(n=C(l({}),t,1),o&&o.set(t,n),n))(typeof WeakMap!="undefined"?new WeakMap:0);var f={};s(f,{ApplicationCommand:()=>b});var r=require("./BaseCommandConstructor");class b extends r.BaseCommand{constructor(t,n,a){super(t,a,n);this.type=1}}module.exports=d(f);0&&(module.exports={ApplicationCommand});
//# sourceMappingURL=ApplicationCommandConstructor.js.map
