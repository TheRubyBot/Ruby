var e=require("dotenv/config"),o=require("./core/bot");const s=new o.Bot({commandsDir:"commands",owners:["796336114113183746"],testServers:["876649337659215976"],prefixes:["."],globalSlashTesting:process.env.NODE_ENV==="DEVELOPMENT"});s.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map
