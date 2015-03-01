Quintus.Characters = function(Q) {
  Q.Sprite.extend("Teacher", {
    init: function(p) {
      this._super(p, {
        type: Q.TEACHER,
        x: 150,
        y: 60,
        hitPoints: 100,
        collisionMask: Q.STUDENT_AND_FURNITURE
      });
      this.add("2d");
      this.add("stepControls");
    }
  });

  Q.Sprite.extend("Student", {
    init: function(p) {
      this._super(p, {
        type: Q.STUDENT_AND_FURNITURE,
        collisionMask: Q.TEACHER,
        hitPoints: 500
      });
      this.add("2d");
      this.on("hit", function(collision){
        if(collision.obj.isA("Teacher")){
          console.log("Thanks Aaron!");
          this.p.hitPoints = this.p.hitPoints + 1;
          console.log(this.p.hitPoints);
        }
        else{
          console.log(collision.obj);
        }
      });
    },
    step: function(dt){
      this.p.hitPoints = this.p.hitPoints - 0.0001;
    }
  });
}






