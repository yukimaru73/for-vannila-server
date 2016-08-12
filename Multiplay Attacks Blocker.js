//変数など
var AllEntity;
var PlayerEntity;
var Name={};
var Blocks=[];
var Blocks2View=[];
var BlockID=[];
var Players={};
var PlayerName=[];
var Jurisdiction={};
var modname="ServerAttacksBlocker_ver:1.0";
var exBlockA=[31,78,106,175];//通常ブロック用の例外ID
var exBlockB=[0,6,8,9,10,11,31,32,38,50,65,78,106,171,175];//バケツ用の例外ID
var exBlockC=[1,4,5,9,12,13];//高い植物の例外ダメージ値
var exBlockD=[8,9,10,11]//爆発減衰用
var delBlock=[];//削除予定のブロック

var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var ColorDrawable=android.graphics.drawable.ColorDrawable;
var PopupWindow=android.widget.PopupWindow;
var OnClickListener=android.view.View.OnClickListener;
var OnFocusChangeListener=android.view.View.OnFocusChangeListener;
var Color=android.graphics.Color;
var Button=android.widget.Button;
var CompoundButton=android.widget.CompoundButton;
var LinearLayout=android.widget.LinearLayout;
var TextView=android.widget.TextView;
var EditText=android.widget.EditText;
var SeekBar=android.widget.SeekBar;
var CheckBox=android.widget.CheckBox;
var AlertDialog=android.app.AlertDialog;
var DialogInterface=android.content.DialogInterface;

var alertdialogbuilderfblocks;
var alertdialogfblocks;

var alertdialogbuilderfBlockLimit;
var alertdialogfBlockLimit;

eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('2 10=(w(){2 m=11.12.13.14()+"/15/16.17/";w D(a,b,d){E{5(a){2 f=3 4.6.o(m+"F/"+G.H()+"/p.q")}7{2 f=3 4.6.o(m+"p.q")}5(!f.I()){f.18();2 g=3 4.6.J(3 4.6.K(f));g.r(s.L([[9,[[b,d]]]]));g.t();n M}7{2 h=3 4.6.N(3 4.6.O(f));2 k=3 4.u.P();2 c;Q((c=h.R())!=-1)k.r(3 4.u.S(c));h.t();2 l=s.T(k);5(19.1a(l)){5(l.8!=0){v(2 i=0;i<l.8;i++){5(l[i][0]==9){v(2 j=0;j<l[i][1].8;j++){5(l[i][1][j][0]==b){l[i][1][j][1]=d;x}7 5(j+1==l[i][1].8){l[i][1].y([b,d]);x}}x}7 5(i+1==l.8){l.y([9,[[b,d]]])}}}7{l.y([9,[[b,d]]])}}7{l=[[9,[[b,d]]]]}2 g=3 4.6.J(3 4.6.K(f));g.r(s.L(l));g.t();n M}}U(e){V("[1b W]"+e);n 1c}}w X(a,b){E{5(a){2 d=3 4.6.o(m+"/"+"F/"+G.H()+"/p.q")}7{2 d=3 4.6.o(m+"/"+"p.q")}5(!d.I())z"1d 1e A B C.";2 f=3 4.6.N(3 4.6.O(d));2 g=3 4.u.P();2 c;Q((c=f.R())!=-1)g.r(3 4.u.S(c));f.t();2 h=s.T(g);v(2 i=0;i<h.8;i++){5(h[i][0]==9){v(2 j=0;j<h[i][1].8;j++){5(h[i][1][j][0]==b){n h[i][1][j][1]}7 5(j+1==h[i][1].8){z"Y 1f A B C.";}}}7 5(i+1==h.8){z"Y 9 A B C.";}}}U(e){V("[1g W]: "+e+"\\1h Z.");n Z}}n{1i:D,1j:X}})();',62,82,'||var|new|java|if|io|else|length|modname||||||||||||||return|File|svdt|txt|append|JSON|close|lang|for|function|break|push|throw|is|not|exist|save|try|minecraftWorlds|Level|getWorldDir|exists|OutputStreamWriter|FileOutputStream|stringify|true|InputStreamReader|FileInputStream|StringBuilder|while|read|Character|parse|catch|print|Failed|load|Designated|undefined|DataIO|android|os|Environment|getExternalStorageDirectory|games|com|mojang|createNewFile|Array|isArray|Save|false|Savedata|file|key|Load|nReturned|SaveData|LoadData'.split('|'),0,{}));

(function(){//アイテム名取得
 for(var i=0;i<4096;i++){
  if(Item.isValidItem(i)){
   if(i<256&&i!=181&&i!=182){
    for(var j=0;j<16;j++){
     if(j==0){
      Name[i]={};
      Name[i][j]=Item.getName(i,j,false);
     }else if(Item.getName(i,j,false)!=Item.getName(i,0,false)&&Item.getName(i,j,false)!=Item.getName(i,j-1,false)){
      Name[i][j]=Item.getName(i,j,false);
     }else{
      break;
     }
    }
   }else{
    Name[i]={};
    Name[i][0]=Item.getName(i,0,false);
   }
  }
 }
 for(var i=0,keys=Object.keys(Name);;i++){
  if(Number(keys[i])<256){
   for(var j=0,key=Object.keys(Name[i]);j<key.length;j++){
    Blocks2View.push("ID "+i+":"+j+"\n"+String(Name[i][j]));
    Blocks.push("ID "+i+":"+j+"\n"+String(Name[i][j]));
   }
  }else{
   break;
  }
 }
 //print("アイテム名取得完了");
}());

function dip2px(dips){
 return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}

var BannedID={
 GUEST:[],
 ADMIN:[],
 MASTER:[]
};

var Defaults={
 Pos:{
  X:null,
  Y:null,
  Z:null
 }
};

var Config={
 Settings:{
  ShowAdvanced:false,
  ShowUnstable:false
 },
 Limit:{
  LevelBreaking:false,
  Explosion:false,
  LavaBucket:0,
  WaterBucket:0,
  FlintandSteel:0,
  SpawnEgg:0
 }
};

var Const={
 Height:ctx.getWindowManager().getDefaultDisplay().getHeight(),
 Width:ctx.getWindowManager().getDefaultDisplay().getWidth(),
 DecorView:ctx.getWindow().getDecorView(),
 WRAP_CONTENT:android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
 MATCH_PARENT:android.widget.RelativeLayout.LayoutParams.MATCH_PARENT
};
(function(){//データのロード用
 if(DataIO.LoadData(false,"Jurisdiction")!=undefined) Jurisdiction=DataIO.LoadData(false,"Jurisdiction");
 if(DataIO.LoadData(false,"Config")!=undefined) Config=DataIO.LoadData(false,"Config");
 if(DataIO.LoadData(false,"BannedID")!=undefined) BannedID=DataIO.LoadData(false,"BannedID");
}());

function modTick(){
 //すべてのエンティティのUUIDを取得
 AllEntity=Array.prototype.slice.apply(Entity.getAll());
 
 //新規参加プレイヤーの割り出し
 for(var i=0;i<AllEntity.length;i++){
  if(Entity.getEntityTypeId(AllEntity[i])==63){
   if(!searchkeysbyID(AllEntity[i])){//新規プレイヤー発見!
    Players[AllEntity[i]]={
     X:null,
     Y:null,
     Z:null,
     NAME:Entity.getNameTag(AllEntity[i]),
     JURIS:null,
     HP:null,
     MAXHP:null,
    };
    PlayerName.push(Entity.getNameTag(AllEntity[i]));
    if(!CheckJuris(AllEntity[i])){
     Jurisdiction[Players[AllEntity[i]]["NAME"]]="GUEST";
     Players[AllEntity[i]]["JURIS"]="GUEST";
     print("初見さん入りまーす");
    }else{
     Players[AllEntity[i]]["JURIS"]=CheckJuris(AllEntity[i]);//2回目以降の方
     print("リピーターさん入りまーす");
    }
   }
  }
 }
 
 for(var i=0,keys=Object.keys(Players);i<keys.length;i++){
  //プレイヤーデータの更新
  Players[keys[i]]["X"]=Entity.getX(Number(keys[i]));
  Players[keys[i]]["Y"]=Entity.getY(Number(keys[i]));
  Players[keys[i]]["Z"]=Entity.getZ(Number(keys[i]));
  Players[keys[i]]["HP"]=Entity.getHealth(Number(keys[i]));
  Players[keys[i]]["MAXHP"]=Entity.getMaxHealth(Number(keys[i]));
  
  //プレイヤーの退出を検知
  if(Players[keys[i]]["X"]==0&&Players[keys[i]]["Y"]==0&&Players[keys[i]]["Z"]==0){
   print(Players[keys[i]]["NAME"]+"さんが退出しました");
   for(var j=0;j<PlayerName.length;j++){
    if(PlayerName[j]==Players[keys[i]]["NAME"]){
     PlayerName.splice(j,1);
     print("PlayerNameからの削除完了");
    }
   }
   delete Players[keys[i]];
  }
 }
 
 //GUIのプレイヤーデータの更新
 if(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected!=null){
  GUI.SubMenu.Child.Scroll.Child.updateMeth(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected);
 }
 //禁止ブロックの置換
 for(var i=0;i<delBlock.length;i++){
  setTile(delBlock[i][0],delBlock[i][1],delBlock[i][2],delBlock[i][3],delBlock[i][4]);
  delBlock.splice(i,1);
 }
}

//UUIDを使ってPlayerから存在を確認
function searchkeysbyID(uuid){
 for(var i=0,keys=Object.keys(Players);i<keys.length;i++){
  if(keys[i]==uuid){
   return true;
  }else if(i+1==keys.length){
   return false;
}}}

//プレーヤーの権限をチェックする
function CheckJuris(uuid){
 for(var i=0,J=Object.keys(Jurisdiction);i<J.length;i++){
  if(J[i]==Entity.getNameTag(uuid)){
   return Jurisdiction[J[i]];
  }else if(J.length==i+1){
   return false;
}}}

//プレーヤーの権限をロードデータ部分で変更
function SetJuris(uuid,New){
 for(var i=0,J=Object.keys(Jurisdiction);i<J.length;i++){
  if(J[i]==Entity.getNameTag(uuid)){
   Jurisdiction[J[i]]=New;
  }else if(J.length==i+1){
   return false;
}}}

//プレーヤー名からUUIDを割り出し
function searchIDbyName(name){
 for(var i=0,keys=Object.keys(Players);i<keys.length;i++){
  if(Players[keys[i]]["NAME"]==name){
   return Number(keys[i]);
  }else if(i+1==keys.length){
   return null;
}}}

//配列から検索
function Search(int,arr){
 if(arr.length==0){
  return false;
 }
 for(var i=0;i<arr.length;i++){
  if(int==arr[i]){
   return true;
  }else if(i+1==arr.length){
   return false;
}}}

//ブロック一覧の名前からIDとダメージ値を出力
function SearchIDbyListName(name){
 var str=String(name).split(" ");
 var str2=str[1].split("\n");
 var str3=str2[0].split(":");
 //var str=name.split(" ")[1].split("\n")[0].split(":");
 return [Number(str3[0]),Number(str3[1])];
}

//ブロック設置制限用検索
function SearchBID(id,dmg,arr){
 if(arr.length==0){
  return false;
 }
 for(var i=0;i<arr.length;i++){
  if(id==arr[i][0]&&dmg==arr[i][1]){
   return true;
  }else if(i++==arr.lrngth){
   return false;
}}}

//権限数字変換
function Jrs2Num(jrs){
 switch(jrs){
  case "GUEST":
   return 1;
  break;
  case "ADMIN":
   return 2;
  break;
  case "MASTER":
   return 3;
  break;
}}

function useItem(x,y,z,iI,bI,s,iD,bD){
 var ent=getPlayerEnt();
 if(!searchkeysbyID(ent)){
  Players[ent]={
   X:null,
   Y:null,
   Z:null,
   NAME:Entity.getNameTag(AllEntity[i]),
   JURIS:null,
   HP:null,
   MAXHP:null,
  };
  PlayerName.push(Entity.getNameTag(ent));
  if(!CheckJuris(ent)){
   Jurisdiction[Players[ent]["NAME"]]="GUEST";
   Players[ent]["JURIS"]="GUEST";
   //print("初見さん入りまーす");
  }else{
   Players[ent]["JURIS"]=CheckJuris(ent);//2回目以降の方
   //print("リピーターさん入りまーす");
  }
 }
 switch(CheckJuris(ent)){
  case "GUEST":
   var Banned=BannedID.GUEST;
  break;
  case "ADMIN":
   var Banned=BannedID.ADMIN;
  break;
  case "MASTER":
   var Banned=BannedID.MASTER;
  break;
 }
 if(SearchBID(iI,iD,Banned)){
  if(iI>0&&iI<256){
   if(Search(bI,exBlockA)&&!Search(bD,exBlockC)){
    delBlock.push([x,y,z,bI,bD]);
    if(bI==175){
     delBlock.push([x,y-1,z,getTile(x,y-1,z),Level.getData(x,y-1,z)]);
    }
   }else{
    if(bI==0){
     delBlock.push([x,y,z,bI,bD]);
    }
    switch(s){
     case 0:
      delBlock.push([x,y-1,z,getTile(x,y-1,z),Level.getData(x,y-1,z)]);
     break;
     case 1:
      delBlock.push([x,y+1,z,getTile(x,y+1,z),Level.getData(x,y+1,z)]);
     break;
     case 2:
      delBlock.push([x,y,z-1,getTile(x,y,z-1),Level.getData(x,y,z-1)]);
     break;
     case 3:
      delBlock.push([x,y,z+1,getTile(x,y,z+1),Level.getData(x,y,z+1)]);
     break;
     case 4:
      delBlock.push([x-1,y,z,getTile(x-1,y,z),Level.getData(x-1,y,z)]);
     break;
     case 5:
      delBlock.push([x+1,y,z,getTile(x+1,y,z),Level.getData(x+1,y,z)]);
     break;
    }
   }
  }
 }
 switch(iI){
  case 325:
   if(iD==8){
    if(Config.Limit.WaterBucket>=Jrs2Num(CheckJuris(ent))){
     switch(s){
      case 0:
       if(Search(getTile(x,y-1,z),exBlockB)){
        delBlock.push([x,y-1,z,getTile(x,y-1,z),Level.getData(x,y-1,z)]);
       }
      break;
      case 1:
       if(Search(getTile(x,y+1,z),exBlockB)){
        delBlock.push([x,y+1,z,getTile(x,y+1,z),Level.getData(x,y+1,z)]);
       }
      break;
      case 2:
       if(Search(getTile(x,y,z-1),exBlockB)){
        delBlock.push([x,y,z-1,getTile(x,y,z-1),Level.getData(x,y,z-1)]);
       }
      break;
      case 3:
       if(Search(getTile(x,y,z+1),exBlockB)){
        delBlock.push([x,y,z+1,getTile(x,y,z+1),Level.getData(x,y,z+1)]);
        }
      break;
      case 4:
       if(Search(getTile(x-1,y,z),exBlockB)){
        delBlock.push([x-1,y,z,getTile(x-1,y,z),Level.getData(x-1,y,z)]);
       }
      break;
      case 5:
       if(Search(getTile(x+1,y,z),exBlockB)){
        delBlock.push([x+1,y,z,getTile(x+1,y,z),Level.getData(x+1,y,z)]);
       }
      break;
     }
    }
   }else if(iD=10){
    if(Config.Limit.LavaBucket>=Jrs2Num(CheckJuris(ent))){
     switch(s){
      case 0:
       if(Search(getTile(x,y-1,z),exBlockB)){
        delBlock.push([x,y-1,z,getTile(x,y-1,z),Level.getData(x,y-1,z)]);
       }
      break;
      case 1:
       if(Search(getTile(x,y+1,z),exBlockB)){
        delBlock.push([x,y+1,z,getTile(x,y+1,z),Level.getData(x,y+1,z)]);
       }
      break;
      case 2:
       if(Search(getTile(x,y,z-1),exBlockB)){
        delBlock.push([x,y,z-1,getTile(x,y,z-1),Level.getData(x,y,z-1)]);
       }
      break;
      case 3:
       if(Search(getTile(x,y,z+1),exBlockB)){
        delBlock.push([x,y,z+1,getTile(x,y,z+1),Level.getData(x,y,z+1)]);
        }
      break;
      case 4:
       if(Search(getTile(x-1,y,z),exBlockB)){
        delBlock.push([x-1,y,z,getTile(x-1,y,z),Level.getData(x-1,y,z)]);
       }
      break;
      case 5:
       if(Search(getTile(x+1,y,z),exBlockB)){
        delBlock.push([x+1,y,z,getTile(x+1,y,z),Level.getData(x+1,y,z)]);
       }
      break;
     }
    }
   }
  break;
  case 259:
   if(Config.Limit.FlintandSteel>=Jrs2Num(CheckJuris(ent))){
    switch(s){
     case 0:
      if(getTile(x,y-1,z)==0){
       delBlock.push([x,y-1,z,0,0]);
      }
     break;
     case 1:
      if(getTile(x,y+1,z)==0){
       delBlock.push([x,y+1,z,0,0]);
      }
     break;
     case 2:
      if(getTile(x,y,z-1)==0){
       delBlock.push([x,y,z-1,0,0]);
      }
     break;
     case 3:
      if(getTile(x,y,z+1)==0){
       delBlock.push([x,y,z+1,0,0]);
      }
     break;
     case 4:
      if(getTile(x-1,y,z)==0){
       delBlock.push([x-1,y,z,0,0]);
      }
     break;
     case 5:
      if(getTile(x+1,y,z)==0){
       delBlock.push([x+1,y,z,0,0]);
      }
     break;
    }
   }
  break;
  case 383:
   if(Config.Limit.SpawnEgg>=Jrs2Num(CheckJuris(ent))){
    preventDefault();
   }
  break;
 }
}

function explodeHook(uuid,x,y,z,pow,fire){
 if(Config.Limit.Explosion){
  preventDefault();
 }
 if(Config.Limit.LevelBreaking&&!Config.Limit.Explosion){
  if(!Search(getTile(Math.floor(x),Math.floor(y),Math.floor(z)),exBlockD)){
   delBlock.push([Math.floor(x),Math.floor(y),Math.floor(z),getTile(Math.floor(x),Math.floor(y),Math.floor(z)),Level.getData(Math.floor(x),Math.floor(y),Math.floor(z))]);
   setTile(Math.floor(x),Math.floor(y),Math.floor(z),8,0);
  }
 }
}

function newLevel(hL){
 GUI.OpenMainMenu.Show();
}

function leaveGame(){
 DataIO.SaveData(false,"Jurisdiction",Jurisdiction);
 DataIO.SaveData(false,"Config",Config);
 DataIO.SaveData(false,"BannedID",BannedID);
 Players={};
 PlayerName=[];
 Defaults={
 Pos:{X:null,Y:null,Z:null}};
 ctx.runOnUiThread(java.lang.Runnable({
  run:function(){
   try{
    if(GUI.OpenMainMenu.View!=null){
     GUI.OpenMainMenu.View.dismiss();
     GUI.OpenMainMenu.View=null;
    }
    if(GUI.MainMenu.View!=null){
     GUI.MainMenu.View.dismiss();
     GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
     GUI.MainMenu.Child.Scroll.addedView=[];
     GUI.MainMenu.View=null;
    }
    if(GUI.SubMenu.View!=null){
     GUI.SubMenu.View.dismiss();
     GUI.SubMenu.View=null
    }
    if(GUI.ResetPos.View!=null){
     GUI.ResetPos.View.dismiss();
     GUI.ResetPos.View=null;
    }
    if(GUI.ResetCamera.View!=null){
     GUI.ResetCamera.View.dismiss();
     GUI.ResetCamera.View=null;
    }
   }catch(e){
    print("[エラー]:"+e);
   }
  }
 }));
}

var GUI={
 OpenMainMenu:{
  View:null,
  Prop:new function(){
   this.Layout=new Button(ctx);
   this.Layout.setText("メニュー");
   this.Layout.setTextColor(Color.WHITE);
   this.Layout.setOnClickListener(new OnClickListener({
    onClick: function(v){
     try{
      GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout);
      GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout);
      GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(false);
      GUI.MainMenu.Show(GUI.MainMenu.LR);
      GUI.OpenMainMenu.View.dismiss();
      GUI.OpenMainMenu.View=null;
     }catch(e){
      print("[エラー]:"+e);
     }
    }
   }));
  },
  Show:function(){
   try{
    GUI.OpenMainMenu.View=new PopupWindow(GUI.OpenMainMenu.Prop.Layout,Const.WRAP_CONTENT,Const.WRAP_CONTENT);
    ctx.runOnUiThread(java.lang.Runnable({
     run:function(){
      GUI.OpenMainMenu.View.showAtLocation(Const.DecorView,5|80,0,0);
     }
    }));
   }catch(e){
    print("[エラー]:"+e);
   }
  }
 },
 MainMenu:{
  View:null,
  LR:3,
  Prop:new function(){
   this.Layout=new LinearLayout(ctx);
   this.Layout.setOrientation(1);
   this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(100,20,20,20)));
  },
  Show:function(LR){
   try{
    GUI.MainMenu.View=new PopupWindow(GUI.MainMenu.Prop.Layout, Math.floor(Const.Width/3),Const.Height);
    ctx.runOnUiThread(java.lang.Runnable({
     run:function(){
      GUI.MainMenu.View.showAtLocation(Const.DecorView,LR|48,0,0);
     }
    }));
   }catch(e){
    print("[エラー]:"+e);
   }
  },
  Child:{
   Header:new function(){
    this.Layout=new LinearLayout(ctx);
    this.Layout.setOrientation(0);
    this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(180,20,20,20)));
    this.Child={
     exitBtn:new function(){
      this.Layout=new Button(ctx);
      this.Layout.setText("✕");
      this.Layout.setTextColor(Color.RED);
      this.Layout.setOnClickListener(new OnClickListener({
       onClick: function(v){
        try{
         GUI.MainMenu.View.dismiss();
         GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
         GUI.MainMenu.Child.Scroll.addedView=[];
         GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(false);
         GUI.MainMenu.View=null;
         GUI.OpenMainMenu.Show();
        }catch(e){
         print("[エラー]:"+e);
        }
       }
      }));
     },
     backBtn:new function(){
      this.Layout=new Button(ctx);
      this.Layout.setText("◀");
      this.Layout.setOnClickListener(new OnClickListener({
       onClick:function(v){
        try{
         if(GUI.MainMenu.Child.Scroll.addedView.length==2){
          GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(false);
         }
         GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
         GUI.MainMenu.Child.Scroll.addedView.shift();
         GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.addedView[0]);
        }catch(e){
         print("[エラー]:"+e);
        }
       }
      }));
     },
     changeLR:new function(){
      this.Layout=new Button(ctx);
      this.Layout.setText("⇆");
      this.Layout.setTextColor(Color.WHITE);
      this.Layout.setOnClickListener(new OnClickListener({
       onClick:function(v){
        try{
         if(GUI.MainMenu.LR==3){
          GUI.MainMenu.LR=5;
         }else{
          GUI.MainMenu.LR=3;
         }
         GUI.MainMenu.View.dismiss();
         GUI.MainMenu.Show(GUI.MainMenu.LR);
        }catch(e){
         print("[エラー]:"+e);
        }
       }
      }));
     }
    };
   },
   Title:new function(){
    this.Layout=new TextView(ctx);
    this.Layout.setText("三谷mod");
    this.Layout.setTextSize(dip2px(17));
    this.Layout.setTextColor(Color.WHITE);
   },
   Scroll:new function(){
    this.Layout=new android.widget.ScrollView(ctx);
    this.addedView=[];
    this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(140,20,20,20)));
    this.Child={
     MainLayout:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       PlayerManage:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("プレイヤー管理");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(true);
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Layout);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       ItemLimit:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("アイテム制限");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(true);
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.LimitMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.LimitMenu.Layout);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       EntityManage:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("エンティティ管理");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(true);
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.EntityManageMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.EntityManageMenu.Layout);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       Settings:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("設定");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Header.Child.backBtn.Layout.setEnabled(true);
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       }
      }
     },
     PlayerManageMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       UpdateButton:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("更新");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Adapter=new android.widget.ArrayAdapter(ctx,android.R.layout.simple_list_item_1,PlayerName);
           GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Layout.setAdapter(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Adapter);
           GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Adapter.notifyDataSetChanged();
           print("更新完了");
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       PlayerList:new function(){
        this.Adapter=new android.widget.ArrayAdapter(ctx,android.R.layout.simple_list_item_1,PlayerName);
        this.Layout=new android.widget.ListView(ctx);
        this.Selected=null;
        this.Layout.setBackgroundColor(Color.argb(100,20,20,20));
        this.Layout.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
         onItemClick:function(parent,view,pos){
          try{
           print(parent.getItemAtPosition(pos)+"が選択されました");
           GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected=searchIDbyName(parent.getItemAtPosition(pos));
           switch(Players[searchIDbyName(parent.getItemAtPosition(pos))]["JURIS"]){
            case "GUEST":
             GUI.SubMenu.Child.Scroll.Child.Child.ChangeJuris.Layout.setProgress(0);
            break;
            case "ADMIN":
             GUI.SubMenu.Child.Scroll.Child.Child.ChangeJuris.Layout.setProgress(1);
            break;
            case "MASTER":
             GUI.SubMenu.Child.Scroll.Child.Child.ChangeJuris.Layout.setProgress(2);
            break;
           }
           GUI.SubMenu.Child.Scroll.Child.Child.ChangeJuris.Layout
           if(GUI.SubMenu.View!=null){
            GUI.SubMenu.View.dismiss();
           }
           if(searchIDbyName(parent.getItemAtPosition(pos))==getPlayerEnt()){
            GUI.SubMenu.Child.Scroll.Child.Child.Kick.Layout.setEnabled(false);
            GUI.SubMenu.Child.Scroll.Child.Child.Teleport.Layout.setEnabled(false);
            GUI.SubMenu.Child.Scroll.Child.Child.Camera.Layout.setEnabled(false);
           }else{
            GUI.SubMenu.Child.Scroll.Child.Child.Kick.Layout.setEnabled(true);
            GUI.SubMenu.Child.Scroll.Child.Child.Teleport.Layout.setEnabled(true);
            GUI.SubMenu.Child.Scroll.Child.Child.Camera.Layout.setEnabled(true);
           }
           GUI.SubMenu.Show();
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       }
      }
     },
     LimitMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       BlockLimitBtn:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("ブロック設置制限");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter.notifyDataSetChanged();
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Layout);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       ItemLimitBtn:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("バケツなどの制限");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           GUI.MainMenu.Child.Scroll.Layout.removeView(GUI.MainMenu.Child.Scroll.addedView[0]);
           GUI.MainMenu.Child.Scroll.addedView.unshift(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout);
           GUI.MainMenu.Child.Scroll.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout);
           GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Child.SeekBar.Layout.setProgress(Config.Limit.LavaBucket);
           GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Child.SeekBar.Layout.setProgress(Config.Limit.WaterBucket);
           GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Child.SeekBar.Layout.setProgress(Config.Limit.FlintandSteel);
           GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Child.SeekBar.Layout.setProgress(Config.Limit.SpawnEgg);
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       }
      };
     },
     BlockLimitMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       SearchForm:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         SearchBtn:new function(){
          this.Layout=new Button(ctx);
          this.Layout.setText("✔");
          this.Layout.setTextColor(Color.WHITE);
          this.Layout.setOnClickListener(new OnClickListener({
           onClick:function(v){
            try{
             Blocks2View=[];
             for(var i=0;i<Blocks.length;i++){
              if(~Blocks[i].indexOf(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Textbox.Layout.getText())){
               Blocks2View.push(Blocks[i]);
              }
             }
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter=new android.widget.ArrayAdapter(ctx,android.R.layout.simple_list_item_1,Blocks2View);
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Layout.setAdapter(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter);
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter.notifyDataSetChanged();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         },
         ClearBtn:new function(){
          this.Layout=new Button(ctx);
          this.Layout.setText("✖");
          this.Layout.setTextColor(Color.WHITE);
          this.Layout.setOnClickListener(new OnClickListener({
           onClick:function(v){
            try{
             Blocks2View=[];
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Textbox.Layout.setText("");
             for(var i=0;i<Blocks.length;i++){
              Blocks2View.push(Blocks[i]);
             }
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter=new android.widget.ArrayAdapter(ctx,android.R.layout.simple_list_item_1,Blocks2View);
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Layout.setAdapter(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter);
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter.notifyDataSetChanged();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         },
         Textbox:new function(){
          this.Layout=new EditText(ctx);
          this.Layout.setHint("ブロック名を入れて検索");
          this.Layout.setOnClickListener(new OnClickListener({
           onClick:function(v){
            try{
             alertdialogfblocks.show();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         },
         Adialog:{
          Textbox:new function(){
           this.Layout=new EditText(ctx);
           this.Layout.setHint("岩盤");
          }
         },
         Adialog2:{
          Selected:null,
          OnView:new function(){
           this.Layout=new LinearLayout(ctx);
           this.Layout.setOrientation(1);
          },
          GUEST:new function(){
           this.Layout=new LinearLayout(ctx);
           this.Child={
            CheckBox:new function(){
             this.Layout=new CheckBox(ctx);
            },
            Text:new function(){
             this.Layout=new TextView(ctx);
             this.Layout.setText("GUEST");
             this.Layout.setTextColor(Color.WHITE);
            }
           }
          },
          ADMIN:new function(){
           this.Layout=new LinearLayout(ctx);
           this.Child={
            CheckBox:new function(){
             this.Layout=new CheckBox(ctx);
            },
            Text:new function(){
             this.Layout=new TextView(ctx);
             this.Layout.setText("ADMIN");
             this.Layout.setTextColor(Color.WHITE);
            }
           }
          },
          MASTER:new function(){
           this.Layout=new LinearLayout(ctx);
           this.Child={
            CheckBox:new function(){
             this.Layout=new CheckBox(ctx);
            },
            Text:new function(){
             this.Layout=new TextView(ctx);
             this.Layout.setText("MASTER");
             this.Layout.setTextColor(Color.WHITE);
            }
           }
          }
         }
        }
       },
       BlockList:new function(){
        this.Adapter=new android.widget.ArrayAdapter(ctx,android.R.layout.simple_list_item_1,Blocks2View);
        this.Layout=new android.widget.ListView(ctx);
        this.Layout.setBackgroundColor(Color.argb(100,20,20,20));
        this.Layout.setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
         onItemClick:function(parent,view,pos){
          try{
           GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected=SearchIDbyListName(parent.getItemAtPosition(pos));
           for(var i=0;i<BannedID.GUEST.length;i++){
            if(BannedID.GUEST[i][0]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[0]&&BannedID.GUEST[i][1]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[1]){
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Child.CheckBox.Layout.setChecked(true);
             BannedID.GUEST.splice(i,1);
             break;
            }
           }
           for(var i=0;i<BannedID.ADMIN.length;i++){
            if(BannedID.ADMIN[i][0]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[0]&&BannedID.ADMIN[i][1]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[1]){
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Child.CheckBox.Layout.setChecked(true);
             BannedID.ADMIN.splice(i,1);
             break;
            }
           }
           for(var i=0;i<BannedID.MASTER.length;i++){
            if(BannedID.MASTER[i][0]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[0]&&BannedID.MASTER[i][1]==GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected[1]){
             GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Child.CheckBox.Layout.setChecked(true);
             BannedID.MASTER.splice(i,1);
             break;
            }
           }
           alertdialogfBlockLimit.show();
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       }
      };
     },
     ItemLimitMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       LavaBucket:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("溶岩バケツ");
          this.Layout.setTextColor(Color.WHITE);
         },
         SeekBar:new function(){
          this.Layout=new SeekBar(ctx);
          this.Layout.setMax(3);
          this.Layout.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({
           onStopTrackingTouch:function(v){
            try{
             switch(v.getProgress()){
              case 0:
               print("どの権限であっても溶岩バケツを使用可能です");
              break;
              case 1:
               print("GUESTのみ溶岩バケツを使用できません");
              break;
              case 2:
               print("ADMIN及びGUESTが溶岩バケツを使用できません");
              break;
              case 3:
               print("全員が溶岩バケツを使用できません");
              break;
             }
             Config.Limit.LavaBucket=v.getProgress();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       },
       WaterBucket:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("水バケツ");
          this.Layout.setTextColor(Color.WHITE);
         },
         SeekBar:new function(){
          this.Layout=new SeekBar(ctx);
          this.Layout.setMax(3);
          this.Layout.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({
           onStopTrackingTouch:function(v){
            try{
             switch(v.getProgress()){
              case 0:
               print("どの権限であっても水バケツを使用可能です");
              break;
              case 1:
               print("GUESTのみ水バケツを使用できません");
              break;
              case 2:
               print("ADMIN及びGUESTが水バケツを使用できません");
              break;
              case 3:
               print("全員が水バケツを使用できません");
              break;
             }
             Config.Limit.WaterBucket=v.getProgress();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       },
       FlintandSteel:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("火打ち石");
          this.Layout.setTextColor(Color.WHITE);
         },
         SeekBar:new function(){
          this.Layout=new SeekBar(ctx);
          this.Layout.setMax(3);
          this.Layout.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({
           onStopTrackingTouch:function(v){
            try{
             switch(v.getProgress()){
              case 0:
               print("どの権限であっても火打ち石を使用可能です");
              break;
              case 1:
               print("GUESTのみ火打ち石を使用できません");
              break;
              case 2:
               print("ADMIN及びGUESTが火打ち石を使用できません");
              break;
              case 3:
               print("全員が火打ち石を使用できません");
              break;
             }
             Config.Limit.FlintandSteel=v.getProgress();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       },
       SpawnEgg:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("スポーンエッグ");
          this.Layout.setTextColor(Color.WHITE);
         },
         SeekBar:new function(){
          this.Layout=new SeekBar(ctx);
          this.Layout.setMax(3);
          this.Layout.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({
           onStopTrackingTouch:function(v){
            try{
             switch(v.getProgress()){
              case 0:
               print("どの権限であってもスポーンエッグを使用可能です");
              break;
              case 1:
               print("GUESTのみスポーンエッグを使用できません");
              break;
              case 2:
               print("ADMIN及びGUESTがスポーンエッグを使用できません");
              break;
              case 3:
               print("全員がスポーンエッグを使用できません");
              break;
             }
             Config.Limit.SpawnEgg=v.getProgress();
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       }
      }
     },
     EntityManageMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       DeleteEntity:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("エンティティの消去");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       ManageEntitySpawning:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("エンティティのスポーン調整");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       },
       ManageEntitySpawning:new function(){
        this.Layout=new Button(ctx);
        this.Layout.setText("その他");
        this.Layout.setTextColor(Color.WHITE);
        this.Layout.setOnClickListener(new OnClickListener({
         onClick:function(v){
          try{
           
          }catch(e){
           print("[エラー]:"+e);
          }
         }
        }));
       }
      };
     },
     DeleteEntityMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       
      };
     },
     ManageEntitySpawningMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       
      };
     },
     OtherEntityManagingMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       
      };
     },
     SettingsMenu:new function(){
      this.Layout=new LinearLayout(ctx);
      this.Layout.setOrientation(1);
      this.Child={
       /*ShowAdvanced:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Text:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("拡張項目を表示");
          this.Layout.setTextColor(Color.WHITE);
         },
         Switch:new function(){
          this.Layout=new android.widget.Switch(ctx);
          this.Layout.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener({
           onCheckedChanged:function(v,isChanged){
            try{
             if(isChanged){
              Config.Settings.ShowAdvanced=true;
             }else{
              Config.Settings.ShowAdvanced=false;
             }
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       },*/
       ShowUnstable:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Text:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("不安定な項目を表示");
          this.Layout.setTextColor(Color.RED);
         },
         Switch:new function(){
          this.Layout=new android.widget.Switch(ctx);
          this.Layout.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener({
           onCheckedChanged:function(v,isChanged){
            try{
             if(isChanged){
              Config.Settings.ShowUnstable=true;
              GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Camera.Layout);
              print("※不安定な設定を表示しています※\n予期せぬクラッシュを引き起こす可能性があります\n使用の際は注意してください");
             }else{
              Config.Settings.ShowUnstable=false;
              GUI.SubMenu.Child.Scroll.Child.Layout.removeView(GUI.SubMenu.Child.Scroll.Child.Child.Camera.Layout);
             }
            }catch(e){
             print("[エラー]:"+e);
            }
           }
          }));
         }
        }
       },
       LevelBreaking:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("爆発による地形破壊防止");
          this.Layout.setTextColor(Color.WHITE);
         },
         Switch:new function(){
          this.Layout=new android.widget.Switch(ctx);
          this.Layout.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener({
           onCheckedChanged:function(v,isChanged){
            if(isChanged){
             Config.Limit.LevelBreaking=true;
             print("※爆発の地形破壊を防止しています※\n爆発による地形破壊を起こさないだけであり、爆発そのものを起こさないわけではありません");
            }else{
             Config.Limit.LevelBreaking=false;
            }
           }
          }));
         }
        }
       },
       DisableExplosion:new function(){
        this.Layout=new LinearLayout(ctx);
        this.Child={
         Title:new function(){
          this.Layout=new TextView(ctx);
          this.Layout.setText("あらゆる爆発を発生させない");
          this.Layout.setTextColor(Color.WHITE);
         },
         Switch:new function(){
          this.Layout=new android.widget.Switch(ctx);
          this.Layout.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener({
           onCheckedChanged:function(v,isChanged){
            if(isChanged){
             Config.Limit.Explosion=true;
            }else{
             Config.Limit.Explosion=false;
            }
           }
          }));
         }
        }
       }
      }
     }
    }
   }
  }
 },
 SubMenu:{
  View:null,
  Prop:new function(){
   this.Layout=new LinearLayout(ctx);
   this.Layout.setOrientation(1);
   this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(100,20,20,20)));
  },
  Show:function(){
   GUI.SubMenu.View=new PopupWindow(GUI.SubMenu.Prop.Layout,Math.floor(Const.Width/3),Const.Height);
   ctx.runOnUiThread(java.lang.Runnable({
    run:function(){
     GUI.SubMenu.View.showAtLocation(Const.DecorView,17|48,0,0);
    }
   }));
  },
  Child:{
   Header:new function(){
    this.Layout=new LinearLayout(ctx);
    this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(180,20,20,20)));
    this.Child={
     exitBtn:new function(){
      this.Layout=new Button(ctx);
      this.Layout.setText("✕");
      this.Layout.setTextColor(Color.RED);
      this.Layout.setOnClickListener(new OnClickListener({
       onClick:function(v){
        try{
         GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected=null;
         GUI.SubMenu.View.dismiss();
         GUI.SubMenu.View=null;
        }catch(e){
         print("[エラー]:"+e);
        }
       }
      }));
     }
    }
   },
   Scroll:new function(){
    this.Layout=new android.widget.ScrollView(ctx);
    this.addedView=[];
    this.Layout.setBackgroundDrawable(new ColorDrawable(Color.argb(140,20,20,20)));
    this.Child=new function(){
     this.Layout=new LinearLayout(ctx);
     this.Layout.setOrientation(1);
     this.updateMeth=function(uuid){
      ctx.runOnUiThread(java.lang.Runnable({
       run:function(){
        GUI.SubMenu.Child.Scroll.Child.Child.Name.Layout.setText(Players[uuid]["NAME"]);
        GUI.SubMenu.Child.Scroll.Child.Child.Juris.Layout.setText(Players[uuid]["JURIS"]);
        GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Child.Data.Layout.setText(String(Players[uuid]["X"]));
        GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Child.Data.Layout.setText(String(Players[uuid]["Y"]));
        GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Child.Data.Layout.setText(String(Players[uuid]["Z"]));
        GUI.SubMenu.Child.Scroll.Child.Child.HP.Child.Data.Layout.setText(String(Players[uuid]["HP"]));
       }
      }));
     }
     this.Child={
      Name:new function(){
       this.Layout=new TextView(ctx);
       this.Layout.setTextSize(dip2px(20));
       this.Layout.setTextColor(Color.WHITE);
      },
      Juris:new function(){
       this.Layout=new TextView(ctx);
       this.Layout.setTextSize(dip2px(20));
       this.Layout.setTextColor(Color.WHITE);
      },
      ChangeJuris:new function(){
       this.Layout=new SeekBar(ctx);
       this.Layout.setMax(2);
       this.Layout.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener({
        onStopTrackingTouch:function(v){
         try{
          switch(v.getProgress()){
           case 0:
            Players[GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected]["JURIS"]="GUEST";
            SetJuris(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected,"GUEST");
            print("権限をGUESTに変更しました");
           break;
           case 1:
            Players[GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected]["JURIS"]="ADMIN";
            SetJuris(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected,"ADMIN");
            print("権限をADMINに変更しました");
           break;
           case 2:
            Players[GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected]["JURIS"]="MASTER";
            SetJuris(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected,"MASTER");
            print("権限をMASTERに変更しました");
           break;
          }
         }catch(e){
          print("[エラー]:"+e);
         }
        }
       }));
      },
      Pos:new function(){
       this.Layout=new LinearLayout(ctx);
       this.Layout.setOrientation(1);
       this.Child={
        X:new function(){
         this.Layout=new LinearLayout(ctx);
         this.Child={
          Title:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setText("X:")
           this.Layout.setTextColor(Color.WHITE);
          },
          Data:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setTextColor(Color.WHITE);
          }
         }
        },
        Y:new function(){
         this.Layout=new LinearLayout(ctx);
         this.Child={
          Title:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setText("Y:")
           this.Layout.setTextColor(Color.WHITE);
          },
          Data:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setTextColor(Color.WHITE);
          }
         }
        },
        Z:new function(){
         this.Layout=new LinearLayout(ctx);
         this.Child={
          Title:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setText("Z:")
           this.Layout.setTextColor(Color.WHITE);
          },
          Data:new function(){
           this.Layout=new TextView(ctx);
           this.Layout.setTextColor(Color.WHITE);
          }
         }
        }
       }
      },
      HP:new function(){
       this.Layout=new LinearLayout(ctx);
       this.Child={
        Title:new function(){
         this.Layout=new TextView(ctx);
         this.Layout.setText("HP:")
         this.Layout.setTextColor(Color.WHITE);
        },
        Data:new function(){
         this.Layout=new TextView(ctx);
         this.Layout.setTextColor(Color.WHITE);
        }
       }
      },
      Teleport:new function(){
       this.Layout=new Button(ctx);
       this.Layout.setText("この座標に移動");
       this.Layout.setOnClickListener(new OnClickListener({
        onClick:function(v){
         try{
          if(Defaults.Pos.X==null){
           Defaults.Pos.X=Player.getX();
           Defaults.Pos.Y=Player.getY();
           Defaults.Pos.Z=Player.getZ();
           GUI.ResetPos.Show();
          }
          Entity.setPosition(getPlayerEnt(),Entity.getX(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected),Entity.getY(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected),Entity.getZ(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected));
         }catch(e){
          print("[エラー]:"+e);
         }
        }
       }));
      },
      Camera:new function(){
       this.Layout=new Button(ctx);
       this.Layout.setText("この参加者の視点にする");
       this.Layout.setOnClickListener(new OnClickListener({
        onClick:function(v){
         try{
          ModPE.setCamera(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected);
          GUI.ResetCamera.Show();
         }catch(e){
          print("[エラー]:"+e);
         }
        }
       }));
      },
      Kick:new function(){
       this.Layout=new Button(ctx);
       this.Layout.setText("この参加者をキックする");
       this.Layout.setOnClickListener(new OnClickListener({
        onClick:function(v){
         try{
          print(Entity.getNameTag(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected)+"をキックしました");
          Entity.remove(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Selected);
         }catch(e){
          print("[エラー]:"+e);
         }
        }
       }));
      }
     }
    }
   }
  }
 },
 ResetPos:new function(){
  this.View=null;
  this.Layout=new Button(ctx);
  this.Layout.setText("元の座標に戻る");
  this.Layout.setTextColor(Color.WHITE);
  this.Layout.setOnClickListener(new OnClickListener({
   onClick:function(v){
    try{
     Entity.setPosition(getPlayerEnt(),Defaults.Pos.X,Defaults.Pos.Y,Defaults.Pos.Z);
     Defaults.Pos.X=null;
     Defaults.Pos.Y=null;
     Defaults.Pos.Z=null;
     GUI.ResetPos.View.dismiss();
     GUI.ResetPos.View=null;
    }catch(e){
     print("[エラー]:"+e);
    }
   }
  }));
  this.Show=function(){
   GUI.ResetPos.View=new PopupWindow(GUI.ResetPos.Layout,Const.WRAP_CONTENT,Const.WRAP_CONTENT);
   ctx.runOnUiThread(java.lang.Runnable({
    run:function(){
     GUI.ResetPos.View.showAtLocation(Const.DecorView,3|48,0,0);
    }
   }));
  }
 },
 ResetCamera:new function(){
  this.View=null;
  this.Layout=new Button(ctx);
  this.Layout.setText("元の視点に戻る");
  this.Layout.setTextColor(Color.WHITE);
  this.Layout.setOnClickListener(new OnClickListener({
   onClick:function(v){
    try{
     ModPE.setCamera(getPlayerEnt());
     GUI.ResetCamera.View.dismiss();
     GUI.ResetCamera.View=null;
    }catch(e){
     print("[エラー]:"+e);
    }
   }
  }));
  this.Show=function(){
   GUI.ResetCamera.View=new PopupWindow(GUI.ResetCamera.Layout,Const.WRAP_CONTENT,Const.WRAP_CONTENT);
   ctx.runOnUiThread(java.lang.Runnable({
    run:function(){
     GUI.ResetCamera.View.showAtLocation(Const.DecorView,3|80,0,0);
    }
   }));
  }
 }
};
var adjustGUI={
 Switchies:function(){
  try{
   ctx.runOnUiThread(java.lang.Runnable({
    run:function(){
     GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Child.Switch.Layout.setChecked(Config.Limit.Explosion);
     GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Child.Switch.Layout.setChecked(Config.Limit.LevelBreaking);
     //GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Child.Switch.Layout.setChecked(Config.Settings.ShowAdvanced);
     GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Child.Switch.Layout.setChecked(Config.Settings.ShowUnstable);
    }
   }));
  }catch(e){
   print("[エラー]:"+e);
  }
 }(),
 adialog:function(){
  ctx.runOnUiThread(java.lang.Runnable({
   run:function(){
    alertdialogbuilderfblocks=new AlertDialog.Builder(ctx);
    alertdialogbuilderfblocks.setTitle("ブロック名を入力");
    alertdialogbuilderfblocks.setCancelable(false);
    alertdialogbuilderfblocks.setView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog.Textbox.Layout);
    alertdialogbuilderfblocks.setPositiveButton("完了",new DialogInterface.OnClickListener({
     onClick:function(v){
      try{
       GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Textbox.Layout.setText(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog.Textbox.Layout.getText());
      }catch(e){
       print(e);
      }
     }
    }));
    alertdialogfblocks=alertdialogbuilderfblocks.create();
   }
  }));
 }(),
 adialog2:function(){
  ctx.runOnUiThread(java.lang.Runnable({
   run:function(){
    alertdialogbuilderfBlockLimit=new AlertDialog.Builder(ctx);
    alertdialogbuilderfBlockLimit.setTitle("権限ごとの設置制限");
    alertdialogbuilderfBlockLimit.setCancelable(false);
    alertdialogbuilderfBlockLimit.setView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.OnView.Layout);
    alertdialogbuilderfBlockLimit.setPositiveButton("完了",new DialogInterface.OnClickListener({
    onClick:function(v){
      try{
       if(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Child.CheckBox.Layout.isChecked()){
        BannedID.GUEST.push(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected);
       }
       if(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Child.CheckBox.Layout.isChecked()){
        BannedID.ADMIN.push(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected);
       }
       if(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Child.CheckBox.Layout.isChecked()){
        BannedID.MASTER.push(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.Selected);
       }
       GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Child.CheckBox.Layout.setChecked(false);
       GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Child.CheckBox.Layout.setChecked(false);
       GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Child.CheckBox.Layout.setChecked(false);
      }catch(e){
       print(e);
      }
     }
    }));
    alertdialogfBlockLimit=alertdialogbuilderfBlockLimit.create();
   }
  }));
 }(),
 addView:{
  MainMenu:{
   Menu:function(){
    GUI.MainMenu.Prop.Layout.addView(GUI.MainMenu.Child.Header.Layout);
    GUI.MainMenu.Prop.Layout.addView(GUI.MainMenu.Child.Title.Layout);
    GUI.MainMenu.Prop.Layout.addView(GUI.MainMenu.Child.Scroll.Layout);
   }(),
   Child:{
    Header:function(){
     GUI.MainMenu.Child.Header.Layout.addView(GUI.MainMenu.Child.Header.Child.exitBtn.Layout,android.view.ViewGroup.LayoutParams(dip2px(41),dip2px(41)));
     GUI.MainMenu.Child.Header.Layout.addView(GUI.MainMenu.Child.Header.Child.backBtn.Layout,android.view.ViewGroup.LayoutParams(dip2px(41),dip2px(41)));
     GUI.MainMenu.Child.Header.Layout.addView(GUI.MainMenu.Child.Header.Child.changeLR.Layout,android.view.ViewGroup.LayoutParams(dip2px(41),dip2px(41)));
    }(),
    Scroll:{
     Child:{
      MainLayout:function(){
       GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout.addView(GUI.MainMenu.Child.Scroll.Child.MainLayout.Child.PlayerManage.Layout);
       GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout.addView(GUI.MainMenu.Child.Scroll.Child.MainLayout.Child.ItemLimit.Layout);
       //GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout.addView(GUI.MainMenu.Child.Scroll.Child.MainLayout.Child.EntityManage.Layout);
       GUI.MainMenu.Child.Scroll.Child.MainLayout.Layout.addView(GUI.MainMenu.Child.Scroll.Child.MainLayout.Child.Settings.Layout);
      }(),
      PlayerManageMenu:function(){
       GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.UpdateButton.Layout,android.view.ViewGroup.LayoutParams(dip2px(80),dip2px(46)));
       GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Layout.setAdapter(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Adapter);
       GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.PlayerManageMenu.Child.PlayerList.Layout,android.view.ViewGroup.LayoutParams(Math.floor(Const.Width/3),Math.floor(Const.Height/1.5)));
      }(),
      LimitMenu:function(){
       GUI.MainMenu.Child.Scroll.Child.LimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.LimitMenu.Child.BlockLimitBtn.Layout);
       GUI.MainMenu.Child.Scroll.Child.LimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.LimitMenu.Child.ItemLimitBtn.Layout);
      }(),
      BlockLimitMenu:{
       Main:function(){
        GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Layout.setAdapter(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Adapter);
        GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Layout);
        GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.BlockList.Layout,android.view.ViewGroup.LayoutParams(Math.floor(Const.Width/3),Math.floor(Const.Height/1.3)));
       }(),
       Child:{
        SearchForm:function(){
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.SearchBtn.Layout,android.view.ViewGroup.LayoutParams(dip2px(43),dip2px(43)));
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.ClearBtn.Layout,android.view.ViewGroup.LayoutParams(dip2px(43),dip2px(43)));
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Textbox.Layout);
        }(),
        Child:function(){
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Child.CheckBox.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Child.Text.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Child.CheckBox.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Child.Text.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Child.CheckBox.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Child.Text.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.OnView.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.GUEST.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.OnView.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.ADMIN.Layout);
         GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.OnView.Layout.addView(GUI.MainMenu.Child.Scroll.Child.BlockLimitMenu.Child.SearchForm.Child.Adialog2.MASTER.Layout);
        }()
       }
      },
      ItemLimitMenu:{
       Main:function(){
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Layout);
       }(),
       Child:function(){
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Child.SeekBar.Layout,android.view.ViewGroup.LayoutParams(dip2px(190),Const.WRAP_CONTENT));
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.LavaBucket.Child.Title.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Child.SeekBar.Layout,android.view.ViewGroup.LayoutParams(dip2px(190),Const.WRAP_CONTENT));
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.WaterBucket.Child.Title.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Child.SeekBar.Layout,android.view.ViewGroup.LayoutParams(dip2px(190),Const.WRAP_CONTENT));
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.FlintandSteel.Child.Title.Layout);
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Child.SeekBar.Layout,android.view.ViewGroup.LayoutParams(dip2px(190),Const.WRAP_CONTENT));
        GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Layout.addView(GUI.MainMenu.Child.Scroll.Child.ItemLimitMenu.Child.SpawnEgg.Child.Title.Layout);
       }()
      },
      EntityManageMenu:function(){
       
      }(),
      SettingsMenu:{
       Menu:function(){
        GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Layout)
        GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Layout)
        //GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Layout);
        GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Layout);
       }(),
       Child:{
        /*ShowAdvanced:function(){
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Child.Switch.Layout);
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowAdvanced.Child.Text.Layout);
        }(),*/
        ShowUnstable:function(){
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Child.Switch.Layout);
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.ShowUnstable.Child.Text.Layout);
        }(),
        LevelBreaking:function(){
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Child.Switch.Layout);
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.LevelBreaking.Child.Title.Layout);
        }(),
        DisableExplosion:function(){
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Child.Switch.Layout);
         GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Layout.addView(GUI.MainMenu.Child.Scroll.Child.SettingsMenu.Child.DisableExplosion.Child.Title.Layout);
        }()
       }
      }
     }
    }
   }
  },
  SubMenu:{
   Main:function(){
    GUI.SubMenu.Prop.Layout.addView(GUI.SubMenu.Child.Header.Layout);
    GUI.SubMenu.Prop.Layout.addView(GUI.SubMenu.Child.Scroll.Layout);
   }(),
   Child:{
    Header:function(){
     GUI.SubMenu.Child.Header.Layout.addView(GUI.SubMenu.Child.Header.Child.exitBtn.Layout,android.view.ViewGroup.LayoutParams(dip2px(41),dip2px(41)));
    }(),
    Scroll:{
     Main:function(){
      GUI.SubMenu.Child.Scroll.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Layout);
     }(),
     Child:{
      Main:function(){
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Kick.Layout,0);
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Teleport.Layout,0);
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.HP.Layout,0);
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Layout,0);
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.ChangeJuris.Layout,0,android.view.ViewGroup.LayoutParams(dip2px(190),Const.MATCH_PARENT));
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Juris.Layout,0);
       GUI.SubMenu.Child.Scroll.Child.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Name.Layout,0);
      }(),
      Child:{
       Pos:{
        Main:function(){
         GUI.SubMenu.Child.Scroll.Child.Child.Pos.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Layout);
         GUI.SubMenu.Child.Scroll.Child.Child.Pos.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Layout);
         GUI.SubMenu.Child.Scroll.Child.Child.Pos.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Layout);
        }(),
        Child:{
         X:function(){
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Child.Title.Layout);
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.X.Child.Data.Layout);
         }(),
         Y:function(){
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Child.Title.Layout);
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Y.Child.Data.Layout);
         }(),
         Z:function(){
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Child.Title.Layout);
          GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.Pos.Child.Z.Child.Data.Layout);
         }(),
        }
       },
       HP:function(){
        GUI.SubMenu.Child.Scroll.Child.Child.HP.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.HP.Child.Title.Layout);
        GUI.SubMenu.Child.Scroll.Child.Child.HP.Layout.addView(GUI.SubMenu.Child.Scroll.Child.Child.HP.Child.Data.Layout);
       }()
      }
     }
    }
   }
  }
 }
};