var d=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var g=n=>d(n,"__esModule",{value:!0});var A=(n,a)=>{for(var i in a)d(n,i,{get:a[i],enumerable:!0})},C=(n,a,i,t)=>{if(a&&typeof a=="object"||typeof a=="function")for(let o of f(a))!u.call(n,o)&&(i||o!=="default")&&d(n,o,{get:()=>a[o],enumerable:!(t=l(a,o))||t.enumerable});return n};var h=(n=>(a,i)=>n&&n.get(a)||(i=C(g({}),a,1),n&&n.set(a,i),i))(typeof WeakMap!="undefined"?new WeakMap:0);var e=(n,a,i)=>new Promise((t,o)=>{var r=m=>{try{s(i.next(m))}catch(c){o(c)}},p=m=>{try{s(i.throw(m))}catch(c){o(c)}},s=m=>m.done?t(m.value):Promise.resolve(m.value).then(r,p);s((i=i.apply(n,a)).next())});var y={};A(y,{ApplicationCommandHandler:()=>w});class w{constructor(a,i){this.commands=new Map;e(this,null,function*(){for(const t of i){let o=yield import(t);"default"in o?o=o.default:"command"in o&&(o=o.command),"options"in o&&this.commands.set(o.name,o)}a.commands.succeed(`Loaded ${this.commands.size} commands`)})}}module.exports=h(y);0&&(module.exports={ApplicationCommandHandler});
//# sourceMappingURL=ApplicationCommandHandler.js.map