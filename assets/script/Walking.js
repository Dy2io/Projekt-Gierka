// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        speed: 200,
        player: {
            default: null,
            type: cc.Node
        }
    },

    moveRight: false,
    moveLeft: false,


    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchEnd, this);
    },

    onTouchStart: function () {
        if(this.node.name == 'rightArrow'){
            this.moveRight = true;
            this.player.scaleX = Math.abs(this.player.scaleX);
        }
        else if(this.node.name == 'leftArrow'){
            this.moveLeft = true;
            this.player.scaleX = Math.abs(this.player.scaleX)*-1;
        }
        if(this.player.getComponent(cc.Animation).getAnimationState("runs").isPaused){
            this.player.getComponent(cc.Animation).getAnimationState("runs").play();
        }
    },

    onTouchEnd: function () {
        if(this.node.name == 'rightArrow'){
            this.moveRight = false;
        }
        else if(this.node.name == 'leftArrow'){
            this.moveLeft = false;
        }
        if(this.player.getComponent(cc.Animation).getAnimationState("runs").isPlaying){
            this.player.getComponent(cc.Animation).setCurrentTime(0);
            this.player.getComponent(cc.Animation).getAnimationState("runs").pause();
        }
    },

    start () {
        //var label = this.getComponent("WalkScript")
        this.node.on('touchstart', function(){
            this.opacity = 250
        }, this.node);

        this.node.on('touchend', function(){
            this.opacity = 100
        }, this.node);

        this.node.on('touchcancel', function(){
            this.opacity = 100
        }, this.node);
    },

    update (dt) {
        if(this.moveRight && this.player.position.x+this.player.width/2 <= 2116){
            this.player.setPosition(this.player.position.x + this.speed * dt, this.player.position.y);
        }
        else if(this.moveLeft && this.player.position.x-this.player.width/2 >= -680){
            this.player.setPosition(this.player.position.x - this.speed * dt, this.player.position.y);
        }
    },
});
