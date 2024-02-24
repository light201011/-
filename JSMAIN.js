//导入
import * as mc from '@minecraft/server';
import { con } from './data.js';
import {  ActionFormData,  MessageFormData,  ModalFormData} from "@minecraft/server-ui";
//基础定义
var getAllPlayers_name = [];
//工具
function removeId(stringToRemove,arr){
    let index = arr.indexOf(stringToRemove);
    if (index > -1) {
        arr.splice(index, 1);
    };
};
function getAllPlayersName(){
    getAllPlayers_name = [];
    var namePushText = mc.world.getAllPlayers();
    for (var i=0;i<mc.world.getAllPlayers().length;i++){
        getAllPlayers_name.push(namePushText[i].name);
    };
    return getAllPlayers_name;
};
function nameToPlayer(name){
    for (var i=0;i<mc.world.getAllPlayers().length;i++){
        if (mc.world.getAllPlayers()[i].name === name){
            return mc.world.getAllPlayers()[i];
        };
    };
    return null;
};
//ui
var setSpawn = new ModalFormData()
    .title(con.ui.set_title)
    .textField(con.ui.set.text1, con.ui.set.textDef1, "0")
    .textField(con.ui.set.text2, con.ui.set.textDef2, "0")
    .textField(con.ui.set.text3, con.ui.set.textDef3, "0")
var tpUi;
var tpUiSwitch = new MessageFormData()
    .title(con.ui.tpUiSwich_title)
    .body(con.ui.tpUiSwitch.error)
    .button1(con.ui.tpUiSwitch.a)
    .button2(con.ui.tpUiSwitch.b)
let setting = new ActionFormData()
    .title(con.set.ui.title)
    .body(con.set.ui.body)
    .button(con.set.ui.text1,"textures/items/ender_pearl")
    .button(con.set.ui.text2,"textures/blocks/chest_front")
    .button(con.set.ui.text3,"textures/items/bed_red")
function tpUiShow(player){
    const getAllPlayersNameList = getAllPlayersName();
    tpUi = new ModalFormData()
        .title(con.ui.tpUi_title)
        .dropdown(con.ui.tpUi.downDef,getAllPlayersNameList)
    tpUi.show(player).then(r => {
	    if (r.canceled) return;
	    var target = getAllPlayersNameList[r.formValues[0]];
	    tpUiSwitch = new MessageFormData()
            .title(con.ui.tpUiSwich_title)
            .body(con.ui.tpUiSwitch.body.replace("%%s", target))
            .button1(con.ui.tpUiSwitch.a)
            .button2(con.ui.tpUiSwitch.b)
        target = nameToPlayer(target);
        tpUiSwitch.show(target).then(r => {
            if (r.selection == 0){
                target.sendMessage(con.ui.tpUiSwitch.mesAT);
                player.sendMessage(con.ui.tpUiSwitch.mesAS);
                player.teleport(target.location);
                player.sendMessage(con.ui.tpUiSwitch.mesA);
            }else{
                target.sendMessage(con.ui.tpUiSwitch.mesBT);
                player.sendMessage(con.ui.tpUiSwitch.mesBS);
            };
            return;
        }).catch(e => {
            console.error(e, e.stack);
        });
	    player.sendMessage(con.ui.tpUi.mes);
    }).catch(e => {
	    console.error(e, e.stack);
    });
};
function settingUiShow(player){
    setting.show(player).then(r => {
        if (r.canceled) return;
	    switch(r.selection) {
	        case 0:
	            tpUiShow(player);
	            break;
	        case 1:
	            if (player.hasTag(con.set.permissionTag)){
	                player.runCommand("tag @a remove " + con.set.playerSpawnGife.tag);
	                player.sendMessage(con.set.playerSpawnGife.mes1);
	            }else{
	                player.sendMessage(con.set.playerSpawnGife.mes2);
	            };
	            break;
	        case 2:
	            player.sendMessage(con.ui.set.mes2.replace("%%s", con.com.head));
	            mc.system.run(() => {
	                spawnUiShow(player);
	            });
	            break;
	        default: return;
	    };
    }).catch(e => {
        console.error(e, e.stack);
    });
};
function spawnUiShow(source){
    const loc = source.location
    setSpawn = new ModalFormData()
    .title(con.ui.set_title)
    .textField(con.ui.set.text1, con.ui.set.textDef1, loc.x.toString())
    .textField(con.ui.set.text2, con.ui.set.textDef2, loc.y.toString())
    .textField(con.ui.set.text3, con.ui.set.textDef3, loc.z.toString())
	setSpawn.show(source).then(r => {
	    if (r.canceled) return;
	    source.sendMessage(con.ui.set.mes + r.formValues[0] + "," + r.formValues[1] + "," + r.formValues[2] + "].");
	    source.runCommand("spawnpoint @s"
	    +" " + r.formValues[0]
	    +" " + r.formValues[1]
	    +" " + r.formValues[2]
	    );
	}).catch(e => {
	    console.error(e, e.stack);
	});
};
//订阅消息管理
mc.world.beforeEvents.chatSend.subscribe(beforeChatSend);
mc.world.afterEvents.playerSpawn.subscribe(playerSpawn);
mc.world.beforeEvents.itemUse.subscribe(event => {
    if (event.itemStack.typeId === con.item.set.typeId && event.itemStack.nameTag === con.item.set.nameTag) {
        mc.system.run(() => {
            settingUiShow(event.source);
        });
	};
});
//执行
function run_command(event){
    const head = con.com.head;
    const player = event.sender;
    switch(event.message){
        case head + "spawnpoint":
            player.runCommand("spawnpoint");
            player.sendMessage(con.com.spawn.mes);
            break;
        case head + "setting":
            mc.system.run(() => {
                settingUiShow(player);
            });
            break;
        case head + "getAllPlayersName":
            console.warn(getAllPlayersName());
            player.sendMessage("debug:§4Logs have been returned to the console normally.");
            break;
        default: break;
    };
};
//订阅读取
function beforeChatSend(event){
    var sender = event.sender;
    var command = event.message;
    if(command[0] === con.com.head){
        event.cancel = true;
        mc.system.run(()=>{
            run_command(event);
        });
        return;
    };
};
function playerSpawn(event){
    let player = event.player;
    player.sendMessage(con.welMes);
    if (!player.hasTag(con.set.playerSpawnGife.tag)){
        const gife = con.set.playerSpawnGife.item;
        for (var i = 0;i < gife.length;i++) {
            player.runCommand("give @s " + gife[i]);
        };
        player.sendMessage(con.set.playerSpawnGife.mes);
        player.runCommand("tag @s add " + con.set.playerSpawnGife.tag);
        return;
    }else {
        return;
    };
};