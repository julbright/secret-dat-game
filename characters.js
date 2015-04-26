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
    },
    mourn: function(student){
      student.destroy();
      this.p.hitPoints = this.p.hitPoints - 10;
    },
    step: function(dt){
      if(this.p.x < 0){
      // this.p.hitPoints = this.p.hitPoints - 1;
        this.p.x = 0;
      }
      else if(this.p.x > 320){
        this.p.x = 320; // probably shouldn't hardcode these value
      }
      else if(this.p.y < 0){
        this.p.y = 0;
      }
      else if(this.p.y > 320){ // shouldn't hardcode this either.
        this.p.y = 320;        // and, oddly, our screen is like 480
      }                        // but we only have 320 worth of tiles out there.
    
      console.log(this.p.x, this.p.y);

    }
  });

  Q.Sprite.extend("Student", {
    init: function(p) {
      this._super(p, {
        type: Q.STUDENT_AND_FURNITURE,
        collisionMask: Q.TEACHER,
        hitPoints: 50
      });

      this.add("2d");
      this.on("hit", function(collision){
        if(collision.obj.isA("Teacher")){
          console.log("Thanks Aaron!");
          this.p.hitPoints = this.p.hitPoints + 1;
        }
        else{
          console.log(collision.obj);
        }
      });
    },
    step: function(dt){
      if(this.p.hitPoints > 0){
      this.p.hitPoints = this.p.hitPoints - 0.1;
      // console.log(this.p.hitPoints);
    }
      else{
        this.trigger("death", this);
      }
    }
  });
}






