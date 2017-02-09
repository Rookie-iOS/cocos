/**
 * Created by yang on 2017/2/8.
 */
var gamecontrolLayer = cc.Layer.extend({

    ctor:function () {
        this._super();

        cc.MenuItemFont.setFontSize(13);
        var mainItem = new cc.MenuItemFont("main",function () {

            var sence = new cc.Scene();
            var layer = new gamestartLayer();
            sence.addChild(layer);
            cc.director.runScene(new cc.TransitionFade(1,sence));
        }.bind(this));

        var menu = new cc.Menu(mainItem);
        menu.setPosition(cc.winSize.width-30,30);
        this.addChild(menu);

        return true;
    }
})