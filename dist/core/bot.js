var a=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var D=Object.prototype.hasOwnProperty;var S=n=>a(n,"__esModule",{value:!0});var x=(n,i)=>{for(var e in i)a(n,e,{get:i[e],enumerable:!0})},H=(n,i,e,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of w(i))!D.call(n,o)&&(e||o!=="default")&&a(n,o,{get:()=>i[o],enumerable:!(s=v(i,o))||s.enumerable});return n};var $=(n=>(i,e)=>n&&n.get(i)||(e=H(S({}),i,1),n&&n.set(i,e),e))(typeof WeakMap!="undefined"?new WeakMap:0);var E={};x(E,{Bot:()=>A});var p=require("@prisma/client"),l=require("discord.js"),d=require("fs"),f=require("path"),h=require("./handlers/ApplicationCommandHandler"),u=require("./util/readDir");class A{constructor(i){this.client=new l.Client({intents:["GUILDS","GUILD_MESSAGES","GUILD_MEMBERS"]});this.prisma=new p.PrismaClient;this.commandsDir="commands";this.owners=[];this.testServers=[];this.prefixes=[];this.client.on("ready",()=>{var t,m,c;console.log(`Logged in as ${(t=this.client.user)==null?void 0:t.tag}`),this.prefixes.push(`<@${(m=this.client.user)==null?void 0:m.id}>`),this.prefixes.push(`<@!${(c=this.client.user)==null?void 0:c.id}>`)});const e=JSON.parse((0,d.readFileSync)("./package.json","utf8"));this.version={number:e.version,revision:e.revision,codename:e.codename};const{commandsDir:s,owners:o,prefixes:r,testServers:C}=i;this.commandsDir=s,this.prefixes=r;for(const t of o)this.client.users.fetch(t).catch(()=>{throw new Error(`Owner: ${t} cannot be seen by bot`)});for(const t of C)this.client.guilds.fetch(t).catch(()=>{throw new Error(`Test server: ${t} cannot be seen by bot`)});if(require.main){const{path:t}=require.main;t&&(this.commandsDir=(0,f.join)(t,this.commandsDir))}const g=(0,u.readDir)(this.commandsDir,{ignoreDot:!0}).filter(t=>t.endsWith(".js")),b=this.seperateCommands(g);this.$applicationCommandHandler=b.applicationCommandHandler}login(i){this.client.login(i)}seperateCommands(i){const e=[],s=[];for(const o of i){let r=require(o);r.command?r=r.command:r.default&&(r=r.default),r.isSlash()?e.push(r):r.isText()&&s.push(r)}return{applicationCommandHandler:this.$applicationCommandHandler=new h.ApplciationCommandHandler(e)}}}module.exports=$(E);0&&(module.exports={Bot});
//# sourceMappingURL=bot.js.map
