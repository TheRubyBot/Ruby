var a=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var D=Object.getOwnPropertyNames;var x=Object.prototype.hasOwnProperty;var H=n=>a(n,"__esModule",{value:!0});var T=(n,i)=>{for(var e in i)a(n,e,{get:i[e],enumerable:!0})},$=(n,i,e,r)=>{if(i&&typeof i=="object"||typeof i=="function")for(let s of D(i))!x.call(n,s)&&(e||s!=="default")&&a(n,s,{get:()=>i[s],enumerable:!(r=w(i,s))||r.enumerable});return n};var A=(n=>(i,e)=>n&&n.get(i)||(e=$(H({}),i,1),n&&n.set(i,e),e))(typeof WeakMap!="undefined"?new WeakMap:0);var I={};T(I,{Bot:()=>E});var d=require("@prisma/client"),f=require("discord.js"),h=require("fs"),u=require("path"),g=require("./handlers/ApplicationCommandHandler"),b=require("./util/readDir");class E{constructor(i){this.client=new f.Client({intents:["GUILDS","GUILD_MESSAGES","GUILD_MEMBERS"]});this.prisma=new d.PrismaClient;this.commandsDir="commands";this.owners=[];this.testServers=[];this.prefixes=[];this.globalSlashTesting=!1;const e=JSON.parse((0,h.readFileSync)("./package.json","utf8"));this.version={number:e.version,revision:e.revision,codename:e.codename};const{commandsDir:r,owners:s,prefixes:t,testServers:m,globalSlashTesting:C}=i;this.commandsDir=r,this.prefixes=t,this.globalSlashTesting=C;for(const o of s)this.client.users.fetch(o).catch(()=>{throw new Error(`Owner: ${o} cannot be seen by bot`)});this.owners=s;for(const o of m)this.client.guilds.fetch(o).catch(()=>{throw new Error(`Test server: ${o} cannot be seen by bot`)});if(this.testServers=m,require.main){const{path:o}=require.main;o&&(this.commandsDir=(0,u.join)(o,this.commandsDir))}this.client.on("ready",()=>{var l,c,p;console.log(`Logged in as ${(l=this.client.user)==null?void 0:l.tag}`),this.prefixes.push(`<@${(c=this.client.user)==null?void 0:c.id}>`),this.prefixes.push(`<@!${(p=this.client.user)==null?void 0:p.id}>`);const o=(0,b.readDir)(this.commandsDir,{ignoreDot:!0}).filter(v=>v.endsWith(".js")),S=this.seperateCommands(o);this.$applicationCommandHandler=S.applicationCommandHandler})}login(i){this.client.login(i)}seperateCommands(i){const e=[],r=[];for(const s of i){let t=require(s);t.command?t=t.command:t.default&&(t=t.default),t.isSlash()?e.push(t):t.isText()&&r.push(t)}return{applicationCommandHandler:new g.ApplciationCommandHandler(e,this)}}}module.exports=A(I);0&&(module.exports={Bot});
//# sourceMappingURL=bot.js.map
