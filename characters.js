Quintus.Characters = function(Q) {
  Q.Sprite.extend("Teacher", {
    init: function(p) {
      this._super(p, {
        type: Q.TEACHER,
        x: 150,
        y: 60,
        collisionMask: Q.STUDENT_AND_FURNITURE
      });
      Q.input.on("right",this,"stepRight");
      Q.input.on("left", this,"stepLeft");
      this.p.vx = 60 + Math.random()*40;
    },
    stepRight: function(p){
    	this.p.x = this.p.x + 10;
    },
    stepLeft: function(p){
    	this.p.x = this.p.x - 10;
    }
  });
}
console.log('i am the teacher and i got loaded');

