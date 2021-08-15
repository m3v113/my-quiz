class Quiz {
  constructor(){
    this.greeting = createElement('h3');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    //caanot read property hide of undefined?
    // this.title.hide();
    // this.input1.hide();
    // this.input2.hide();
    // this.button.hide();
    // this.question.hide();
    // this.option1.hide();
    // this.option2.hide();
    // this.option3.hide();
    // this.option4.hide();

    //write code to change the background color here
    background("lightgreen");

    //write code to show a heading for showing the result of Quiz
    textSize(15);
    fill("black");
    text("RESULTS", 425, 50);

    //call getContestantInfo() here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    //how display?

    if (allContestants !== undefined) {
      fill("blue");
      textSize(20);
      //write code to add a note here
      text("Note: Contestants who answered the question correctly are highlighted in green.", 130, 230);
      
    }

    //write code to highlight contest who answered correctly

    for (var plr in allContestants){
      var correctAns = "2";
      if (correctAns === allContestants[plr].answer) {
        fill("green");
        text("good job " + contestant.name, 300,300);
        // this.greeting.html("hewo " + player.name);
        // this.greeting.position(displayWidth/2 + 420,displayHeight/2 - 80);
      }
      if(correctAns !== allContestants[plr].answer) {
        fill("red")
        text("eep " + contestant.name, 300, 350);
        // this.greeting.html("hewo " + player.name);
        // this.greeting.position(displayWidth/2 + 420,displayHeight/2 - 80);
      }
    }
    
  }

}
