/**
 * Created by yang on 2017/2/7.
 */
var gameLayer = cc.Layer.extend({

    _bg:null,
    _bgHeight:null,
    _bgRe:null,
    _isReload:false,
    ctor:function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        this._bg = new cc.Sprite("#bg01.png");
        this._bg.setAnchorPoint(cc.p(0,0));
        this.addChild(this._bg);


        this._bgHeight = this._bg.getContentSize().height;

        this.schedule(this._movingBackground,3);

        return true;
    },

    _movingBackground:function(){


        this._bg.runAction(cc.MoveBy.create(3,cc.p(0,-48)));
        this._bgHeight -= dt;
        // 已经滚过屏幕了
        if (this._bgHeight<=cc.winSize.height) {
            if (!this._isReload){
                this._bgRe = new cc.Sprite("#bg01.png");
                this._bgRe.setAnchorPoint(cc.p(0,0));
                this._bgRe.setPosition(0,cc.winSize.height-10);
                this.addChild(this._bgRe);
                this._isReload = true;
            }
            this._bgRe.runAction(cc.MoveBy.create(dt,cc.p(0,-dt)));
        }
        // 第一张已经完全滚动完毕
        if (this._bgHeight<=0) {
            this._bgHeight = this._bgRe.getContentSize().height;
            this.removeChild(this._bg,true);
            this._bg = this._bgRe;
            this._bgRe = null;
            this._isReload = false;
        }
    },
});