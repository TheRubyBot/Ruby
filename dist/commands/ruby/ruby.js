var d=(t,i,e)=>new Promise((m,o)=>{var a=n=>{try{r(e.next(n))}catch(c){o(c)}},u=n=>{try{r(e.throw(n))}catch(c){o(c)}},r=n=>n.done?m(n.value):Promise.resolve(n.value).then(a,u);r((e=e.apply(t,i)).next())});var s=require("discord.js"),l=require("../../core/constructors/ApplicationCommandConstructor");module.exports=new l.ApplicationCommand("ruby","Get information about Ruby",[],m=>d(exports,[m],function*({interaction:t,client:i,instance:e}){var r;const o=new s.MessageEmbed({author:{name:`Ruby${e.isDev()?" (Dev)":""} Info`,icon_url:(r=i.user)==null?void 0:r.avatarURL()},fields:[{name:"Members",value:i.users.cache.size.toString(),inline:!0},{name:"Servers",value:i.guilds.cache.size.toString(),inline:!0}],footer:{text:"Oh, also powered by Pepsi Max \u{1F61D}"}}),a=e.version.number+(e.isDev()?`-rev${e.version.revision}`:"");o.setDescription(`Running version **${a}, ${e.version.codename}**, powered by [**discord.js**](https://github.com/discordjs/discord.js)`);const u=new s.MessageActionRow().addComponents(new s.MessageButton({label:"Website",style:"LINK",url:"https://ruby.morganuk.ga"}),new s.MessageButton({label:"Join the Discord server",style:"LINK",url:"https://discord.gg/nHMKwCKyqg"}),new s.MessageButton({label:"Invite to your server",style:"LINK",url:"https://ruby.morganuk.ga/invite",disabled:e.isDev()}));yield t.reply({embeds:[o],components:[u]})}));
//# sourceMappingURL=ruby.js.map
