class Quiz {
  constructor(){
    this.element = createElement('h1');
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
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    this.element.html("Result Of Game");
    this.element.position(350, 0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      fill("blue");
      textSize(20);
      text("Note: Contestant who answered correct are highlighted in green colour!", 130,230);
    }
    //write code to highlight contest who answered correctly
    var yPos=280;
    for(var i in allContestants){
      stroke(3);
      if(allContestants[i].answer==2){
          fill("green");
      }else{
        fill("red")
      }
      text(allContestants[i].name+":"+allContestants[i].answer,190,yPos);
      yPos+=40;
    }
    
  }

}
