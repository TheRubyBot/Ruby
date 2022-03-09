var t=require("dotenv/config"),e=require("./core/bot"),o;const n=new e.Bot({commandsDir:"./commands",eventsDir:"./events",owners:[],devMode:!0});n.login((o=process.env.TOKEN)!=null?o:"").catch(r=>console.error(r));
//# sourceMappingURL=index.js.map
