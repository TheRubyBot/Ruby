var p=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var f=o=>p(o,"__esModule",{value:!0});var C=(o,n)=>{for(var a in n)p(o,a,{get:n[a],enumerable:!0})},A=(o,n,a,m)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of g(n))!u.call(o,i)&&(a||i!=="default")&&p(o,i,{get:()=>n[i],enumerable:!(m=l(n,i))||m.enumerable});return o};var h=(o=>(n,a)=>o&&o.get(n)||(a=A(f({}),n,1),o&&o.set(n,a),a))(typeof WeakMap!="undefined"?new WeakMap:0);var r=(o,n,a)=>new Promise((m,i)=>{var d=t=>{try{s(a.next(t))}catch(c){i(c)}},e=t=>{try{s(a.throw(t))}catch(c){i(c)}},s=t=>t.done?m(t.value):Promise.resolve(t.value).then(d,e);s((a=a.apply(o,n)).next())});var b={};C(b,{ApplciationCommandHandler:()=>M});class M{constructor(n){this.$commands=new Map;r(this,null,function*(){for(const a of n){const m=yield import(a);!m.isSlash()||this.$commands.set(m.name,m)}})}get commands(){return this.commands}getCommand(n){return this.commands.get(n)}}module.exports=h(b);0&&(module.exports={ApplciationCommandHandler});
//# sourceMappingURL=ApplicationCommandHandler.js.map
