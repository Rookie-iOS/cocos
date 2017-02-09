/**
 * Created by yang on 2017/2/7.
 */

var aboutLayer = cc.Layer.extend({

    ctor:function () {
        this._super();

        winSize = cc.winSize;
        var bg = new cc.Sprite(res.Loading_png);
        this.addChild(bg);
        bg.setPosition(winSize.width/2,winSize.height/2);

        var option = new cc.Sprite(res.MenuTitle,cc.rect(0, 36, 100, 34));
        option.setPosition(cc.winSize.width/2,cc.winSize.height/2+120);
        this.addChild(option);

        var label = new cc.LabelTTF("@ Made by Zy");
        label.setPosition(winSize.width/2,winSize.height/2);
        this.addChild(label);

        var backItem = new cc.MenuItemFont("goBack",function () {
            var sence = new cc.Scene();
            var layer = new gamestartLayer();
            sence.addChild(layer);
            cc.director.runScene(new cc.TransitionFade(1,sence));
        }.bind(this));

        var menu = new cc.Menu(backItem);
        menu.setPosition(cc.winSize.width/2,cc.winSize.height/2-50);
        this.addChild(menu);

        backItem.y -= 50;
        backItem.scale = 0.8;
        return true;
    }
})