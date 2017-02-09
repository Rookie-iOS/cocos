/**
 * Created by yang on 2017/2/7.
 */

var settingLayer = cc.Layer.extend({

    ctor:function () {
        this._super();

        winSize = cc.winSize;
        var bg = new cc.Sprite(res.Loading_png);
        this.addChild(bg);
        bg.setPosition(winSize.width/2,winSize.height/2);

        var option = new cc.Sprite(res.MenuTitle,cc.rect(0, 0, 134, 34));
        option.setPosition(cc.winSize.width/2,cc.winSize.height/2+120);
        this.addChild(option);

        cc.MenuItemFont.setFontSize(26);
        var titleOne = new cc.MenuItemFont("Sound");
        var titleTwo = new cc.MenuItemFont("Mode");

        cc.MenuItemFont.setFontSize(20);
        var soundItem = new cc.MenuItemToggle(
            new cc.MenuItemFont("Off"),
            new cc.MenuItemFont("On")
        );
        soundItem.setCallback(function () {
            ZY.SOUND = !ZY.SOUND;
            var audio = cc.audioEngine;
            if (ZY.SOUND) {

                audio.playMusic(res.Bg_Music,true);
            }else {

                audio.stopAllEffects();
                audio.stopMusic();
            }
        }.bind(this));

        state = ZY.SOUND?1:0
        soundItem.setSelectedIndex(state);

        var modeItem = new cc.MenuItemToggle(
            new cc.MenuItemFont("easy"),
            new cc.MenuItemFont("normal"),
            new cc.MenuItemFont("hard")
        );

        var backItem = new cc.MenuItemFont("goBack",function () {
            var sence = new cc.Scene();
            var layer = new gamestartLayer();
            sence.addChild(layer);
            cc.director.runScene(new cc.TransitionFade(1,sence));
        }.bind(this));

        var menu = new cc.Menu(titleOne,titleTwo,soundItem,modeItem,backItem);
        menu.alignItemsInColumns(2,2,1);
        menu.setPosition(cc.winSize.width/2,cc.winSize.height/2-50);
        this.addChild(menu);

        backItem.y -= 50;

        return true;
    }
});
