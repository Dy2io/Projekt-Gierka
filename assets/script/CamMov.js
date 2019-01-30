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
        player: {
            default: null,
            type: cc.Node
        },
    },

    camLock: false,
    leftEdge: false,
    rightEdge: false,

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //console.log('Szerokość kontenera to ' + this.container.name);
    },

    update (dt) {

        if(this.node.position.x-(this.node.parent.width/2)>=-680){
            this.leftEdge = false;
        }
        else if(this.player.position.x+1>this.node.position.x){
            this.leftEdge = false;
        }
        else{
            this.leftEdge = true;
        }

        if(this.node.position.x+(this.node.parent.width/2)<=2120){
            this.rightEdge = false;
        }
        else if(this.player.position.x-1<this.node.position.x){
            this.rightEdge = false;
        }
        else{
            this.rightEdge = true;
        }

        if(!this.leftEdge && !this.rightEdge){
            this.node.setPosition(this.player.position.x, this.node.position.y)
        }

        //this.node.setPosition(this.node.position.x, this.player.position.y+230)

    },
});
