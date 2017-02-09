/**
 * Created by yang on 2017/2/7.
 */

// 初始化 layer
var gamestartLayer = cc.Layer.extend({

    ctor:function () {
        this._super();

        winSize = cc.winSize;
        var bg = new cc.Sprite(res.Loading_png);
        this.addChild(bg);
        bg.setPosition(winSize.width/2,winSize.height/2);

        var logo = new cc.Sprite(res.Logo_png);
        this.addChild(logo);
        logo.setPosition(winSize.width*0.5,winSize.height*0.5+100);

        var newGameNormal = new cc.Sprite(res.Menu_png, cc.rect(0, 0, 126, 33));
        var newGameSelected = new cc.Sprite(res.Menu_png, cc.rect(0, 33, 126, 33));
        var newGameDisabled = new cc.Sprite(res.Menu_png, cc.rect(0, 33 * 2, 126, 33));

        var gameSettingsNormal = new cc.Sprite(res.Menu_png, cc.rect(126, 0, 126, 33));
        var gameSettingsSelected = new cc.Sprite(res.Menu_png, cc.rect(126, 33, 126, 33));
        var gameSettingsDisabled = new cc.Sprite(res.Menu_png, cc.rect(126, 33 * 2, 126, 33));

        var aboutNormal = new cc.Sprite(res.Menu_png, cc.rect(252, 0, 126, 33));
        var aboutSelected = new cc.Sprite(res.Menu_png, cc.rect(252, 33, 126, 33));
        var aboutDisabled = new cc.Sprite(res.Menu_png, cc.rect(252, 33 * 2, 126, 33));

        var flare = new cc.Sprite(res.flare_png);
        flare.setVisible(false);
        this.addChild(flare);

        var newgame = new cc.MenuItemSprite(newGameNormal,newGameSelected,newGameDisabled,function () {
            var layer = new gameLayer();
            var controlLayer = new gamecontrolLayer();
            var sence = new cc.Scene();
            sence.addChild(layer);
            sence.addChild(controlLayer);

            if (ZY.SOUND){
                cc.audioEngine.stopAllEffects();
                cc.audioEngine.playEffect(res.Effect_Music);
            }
            cc.director.runScene(new cc.TransitionFade(1,sence));
        }.bind(this));

        var gameset = new cc.MenuItemSprite(gameSettingsNormal,gameSettingsSelected,gameSettingsDisabled,function () {
            var layer = new settingLayer();
            this.buttonEffect(layer);
        }.bind(this));

        var about = new cc.MenuItemSprite(aboutNormal,aboutSelected,aboutDisabled,function () {
            var layer = new aboutLayer();
            this.buttonEffect(layer);
        }.bind(this));

        var menu = new cc.Menu(newgame,gameset,about);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu);
        menu.setPosition(winSize.width/2,winSize.height/2-80);

        if(ZY.SOUND) {
            cc.audioEngine.setMusicVolume(0.5);
            cc.audioEngine.playMusic(res.Bg_Music,true);
        }

        return true;
    },

    buttonEffect:function (layer) {

        if (ZY.SOUND){
            cc.audioEngine.stopAllEffects();
            cc.audioEngine.playEffect(res.Effect_Music);
        }
        var sence = new cc.Scene();
        sence.addChild(layer);
        cc.director.runScene(new cc.TransitionFade(1,sence));
    },

    flareEffect:function (flare,callback,target) {

        flare.stopAction();
        // 混合颜色
        flare.setBlendFunc(cc.SRC_ALPHA,cc.ONE);
         flare.attr({
             x: -30,
             y: 297,
             visible: true,
             opacity: 0,
             rotation: -120,
             scale: 0.2
         });
        var opacityAnim = cc.fadeTo(0.5, 255);
        var opacDim = cc.fadeTo(1, 0);
        var biggerEase = cc.scaleBy(0.7, 1.2, 1.2).easing(cc.easeSineOut());
        var easeMove = cc.moveBy(0.5, cc.p(328, 0)).easing(cc.easeSineOut());
        var rotateEase = cc.rotateBy(2.5, 90).easing(cc.easeExponentialOut());
        var bigger = cc.scaleTo(0.5, 1);

        var onComplete = cc.callFunc(callback, target);

        var killflare = cc.callFunc(function () {
            this.parent.removeChild(this,true);
        }, flare);
        flare.runAction(cc.sequence(opacityAnim, biggerEase, opacDim, killflare,onComplete));
        flare.runAction(easeMove);
        flare.runAction(rotateEase);
        flare.runAction(bigger);
    }
});

// 加载 sence
gamestartLayer.sence = function () {
    var layer = new gamestartLayer();
    var sence = new cc.Scene();
    sence.addChild(layer);
    return sence;
};


