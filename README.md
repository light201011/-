关于:

作者:

  国际版账号:FasterYard51037
  
  qq:3439848483
  
  bilibili:复杂的规则
  
其他制作者:

  暂无
  
当前版本:

  版本号:1.0.0
  
  最低支持的Minecraft版本:1.20.50
  
致谢:

  暂无
  
为何创作:

  这原来是为了我的一个朋友OYLRYC制作的一个工具(这个工具原来是用来设置重生点，当时在玩下界生存，用工具设置重生点会方便很多)，后来内容变多，便成为了现在的样子。
  鄙人不才，作为一名初中生，这只是一个玩心大起后所产生的一个作品，可能非常烂，请原谅我把它上传至此
更新:

  1.0.0
  
  提交至github

使用:

常规:
  管理员需要先给予自己"AdvancedOP"tag标签(在聊天框输入这一串指令:"/tag @s add AdvancedOP")即可正式开始使用。
  
  使用时，取出木棍(名字需为"工具")，向任何地方长按(特殊情况下(如创造，为木棍赋予32k等)可能会破坏方块，对无法碰到方块的地方长按即可)就可以打开ui菜单，其中提供三个功能(除了金色字的功能都是普通人即可使用， 拥有AdvancedOP标签的玩家则可使用金色字功能)。

命令:

请注意，所有的命令前都需要加上"head"(默认为"+")，例如:setting需要在输入"+setting"，下面命名的展示形式按更新顺序:

  setting:打开菜单
  
  spawnpoint:设置重生点
  
  getAllPlayersName:(开发者命令)读取所有玩家的名字
  

工具菜单的功能:

  传送到玩家:选定一个玩家，并发送传送请求，被选中的玩家会收到请求提示(展示请求ui)，检查同意情况，如同意传送，不同意驳回传送
  
  §重置新手礼包:重置所有人的新手礼包(本质上就是清除所有在线玩家的"hasGife"标签(可修改)，因此，使用指令同样可以单独清除一个人的新手礼包)
  
  设置重生点:打开一个具体(允许您输入具体的x y z坐标，默认显示您当welcome前的x y z坐标)的重生点设置ui

修改配置的内容:

  您需要打开"./scripts/data.js"文件，其中有个常量con，它就是配置对象，修改其中关键字对应的值，即可达到修改配置的作用。
  
  您需要有基本的编程知识，以正常的修改(默认的文件是不会有错误的，只有您调整过才会导致错误，所以请尽量合规的修改)
  
  这里介绍一些，安全的示例:
  
  export const con = {
    welMes: "Welcome",
    set: {
        permissionTag: "OP",
        ui: {
            title: "§l§eTools menu",
            body: "Welcome to the Tools menu. This Tools menu was created by FasterYard51037.",
            text1: "Tp Player",
            text2: "§aReset Novice Pack",
            text3: "Reset Spawn Point"
        },
        playerSpawnGife: {
            item: [
                "apple",
                "red_flower 64",
                "log 1 1",
            ],
            tag: "hasGifeTag",
       ............
