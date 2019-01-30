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
		
        jumpHeight: 0,
        
        jumpDuration: 0,
       
        maxMoveSpeed: 0,
        
        accel: 0,
       
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
		buttonUp: cc.Sprite,
        buttonDown: cc.Sprite,
        floor: 0,
        cam: cc.Camera,
    },
	
	callbackL: function (button) {
       //do whatever you want with button
       //In addition, attention to this way registered events, can not pass customEventData
	   //console.log('click left');
	     if(this.getComponent(cc.Animation).getAnimationState("runs").isPaused){
                    this.getComponent(cc.Animation).getAnimationState("runs").play();
                }
	   this.node.x=this.node.x-20;
    },
	
	callbackR: function (button) {
       //do whatever you want with button
       //In addition, attention to this way registered events, can not pass customEventData
	   //console.log('click left');
	     if(this.getComponent(cc.Animation).getAnimationState("runs").isPaused){
                    this.getComponent(cc.Animation).getAnimationState("runs").play();
                }
	   this.node.x=this.node.x+20;
    },
	
	
	onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },
	
	onLoad: function() {
        
        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);  

        var manager = cc.director.getCollisionManager();
		manager.enabled = true;
		//manager.enabledDebugDraw = true;
		//manager.enabledDrawBoundingBox = true;		
		//cc.director.getPhysicsManager().enabled = true;	
		//this.buttonL.node.on('Pressed', this.callback, this);
    },
	
	onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },    

    update: function (dt) {
        
		
		/*if(this.accLeft==1){
			this.xSpeed=0;
		}else{
			this.xSpeed=-200;
        }*/
        
		//console.log(this.node.y);
	
		
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        
		this.node.x += this.xSpeed * dt;
    },
	
	onCollisionEnter: function (other, self) {
   // console.log('on collision enter polygon blox');

    // Collider Manager will calculate the value in world coordinate system, and put them into the world property
    var world = self.world;

    // Collider Component aabb bounding box
    var aabb = world.aabb;

    // The position of the aabb collision frame before the node collision
    var preAabb = world.preAabb;

    // world transform
    var t = world.transform;

    // Circle Collider Component world properties
    var r = world.radius;
    var p = world.position;

    // Rect and Polygon Collider Component world properties
    var ps = world.points;
	//this.node.y = -54;
	//console.log(this.node.y);
},

	onCollisionStay: function (other, self) {
		
		var li=0;
		
		if(other.node.group=='podloga1'){
			this.node.y = -217;
		}
		
		if(other.node.group=='podloga2'){
			this.node.y = 89;
		}
		
		if(other.node.group=='podloga3'){
			this.node.y = 403;
		}
		
		if(other.node.group=='drzwi1' && this.floor==1){
            this.node.y = 89;
            this.floor = 0;
            this.cam.node.y = 145;
		}
		
		if(other.node.group=='drzwi2' && this.floor==2){
            this.node.y = -217;
            this.floor = 0;
            this.cam.node.y = 1;
		}
		
		if(other.node.group=='drzwi2' && this.floor==1){
            this.node.y = 403;
            this.floor = 0;
            this.cam.node.y = 300;
		}
		
		if(other.node.group=='drzwi3' && this.floor==2){
            this.node.y = 89;
            this.floor = 0;
            this.cam.node.y = 145;
		}
		
		if(other.node.group=='npc'){
			cc.director.loadScene('game');
		}
		
		if(other.node.group=='koniec'){
			cc.director.loadScene('end');
		}
},
	
	onCollisionExit: function (other, self) {
		
    },
    
    changeFloorUp: function (){
        this.floor = 1;
    },

    changeFloorDown: function (){
        this.floor = 2;
    },


     

    start () {
        this.getComponent(cc.Animation).play();
        this.getComponent(cc.Animation).pause("runs");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(e)=>{
            if(e.keyCode == cc.macro.KEY.d){
                if(this.getComponent(cc.Animation).getAnimationState("runs").isPaused){
                    this.getComponent(cc.Animation).getAnimationState("runs").play();
                }
            }
        },this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,(e)=>{
            if(e.keyCode == cc.macro.KEY.d){
                if(this.getComponent(cc.Animation).getAnimationState("runs").isPlaying){
                    this.getComponent(cc.Animation).getAnimationState("runs").pause();
                }
            }
        },this);
		
		this.getComponent(cc.Animation).play();
        this.getComponent(cc.Animation).pause("runs");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,(e)=>{
            if(e.keyCode == cc.macro.KEY.a){
                if(this.getComponent(cc.Animation).getAnimationState("runs").isPaused){
                    this.getComponent(cc.Animation).getAnimationState("runs").play();
                }
            }
        },this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,(e)=>{
            if(e.keyCode == cc.macro.KEY.a){
                if(this.getComponent(cc.Animation).getAnimationState("runs").isPlaying){
                    this.getComponent(cc.Animation).getAnimationState("runs").pause();
                }
            }
        },this);
    }


    


   
});
