// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
		i:0,
    },

 	update: function (dt) {
		
		
		if(this.node.x>1559 && this.i==0){
				this.node.x+=90*dt;
				//console.log(this.node.x);
				//console.log(this.i);
		}
		
		if(this.node.x<2000 && this.i==1){
			this.node.x-=90*dt;
			//console.log(this.node.x);
			//console.log(this.i);
		}
		
		if(this.node.x<1560){
			this.i=0;
			this.node.x+=3;
			this.node.scaleX = Math.abs(this.node.scaleX);
		}
		if(this.node.x>2000){
			this.i=1;
			this.node.x=this.node.x-1;
			this.node.scaleX = Math.abs(this.node.scaleX)*-1;
			//console.log('zamiana');
			//console.log(this.i);
		}
		
		this.getComponent(cc.Animation).getAnimationState("police-run").play();
	},

    start () {

    },

    // update (dt) {},
});
