Quintus.Characters = function(Q) {
  Q.Sprite.extend("Teacher", {
    init: function(p) {
      this._super(p, {
        type: Q.TEACHER,
        x: 150,
        y: 60,
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
        collisionMask: Q.TEACHER  
      });
      this.add("2d");
      this.on("hit", function(collision){
        if(collision.obj.isA("Teacher")){
          console.log("Thanks Aaron!");
        }
        else{
          console.log(collision.obj);
        }
      });
    }
  });
}






