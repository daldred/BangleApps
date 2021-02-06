/* Test  bangle.js input interface */
 var colbackg='#111111';
 //var coldarkred='#CC3333';
 var colorange='#e56e06';
 var colgrey='#51504f';
 var v_font1size='16';
 var v_clicks='0';
 console.log("*** Test input interface ***");
 
 function ClearActiveArea(){
  g.setColor(colbackg); 
  g.fillRect(0,32,239,239); //fill all screen except widget area
  g.flip();
}
function ClearBannerArea(){
  g.setColor(colgrey); 
  g.fillRect(50,32,190,85); //fill an specific area
  g.flip();
}
 
function PrintUserInput(boton){
  console.log("Pressed touch/BTN",boton);
   if (v_clicks=='0') PrintAreas();
  ClearBannerArea();
  
    if (boton=='  <---') {
    var img_off = {
      width : 48, height : 48, bpp : 2,
      transparent : 0,
      palette : new Uint16Array([65535,63968,40283,50781]),
      buffer : E.toArrayBuffer(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAA///9VVVVVVVQAAAD/qq/1VVVVVVVAAAP6qqv9VVVVVVVUAA/qqqv/VVVVVVVVAD+qqq//1VVVVVVVQP6qqq//1VVVVVVVQPqqqr//9VVVVVVVUvqqqr//9VVVVVVVU+qqqv/+uVVVVVVVV+qqqv+quVVVVVVVV+qqq+qqvVVVVVVVV+qqvqqqvVVVVVVVV+qv+qqquVVVVVVVV+r/+qqquVVVVVVVVv//6qqq9VVVVVVVUP//6qqq9VVVVVVVUP//qqqr1VVVVVVVQD//qqqv1VVVVVVVQA/+qqq/VVVVVVVVAAP+qqr9VVVVVVVUAAD/qq/1VVVVVVVAAAA///9VVVVVVVQAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
    };
    g.drawImage(img_off,90,35);
  }
    else if (boton=='  --->')  {
      var img_on = {
      width : 48, height : 48, bpp : 2,
      transparent : 0,
      palette : new Uint16Array([65535,36361,27879,40283]),
      buffer : E.toArrayBuffer(atob("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAABVVVVVqqf///AAAAVVVVVWqn////wAAFVVVVVWqf////8AAVVVVVVap//////ABVVVVVVqr//////wBVVVVVVqn//////8FVVVVVVqv//////8FVVVVVWqf///////VVVVVVWq////////VVVVVVWq////////VVVVVVWq////////VVVVVVWq////////VVVVVVWq////////VVVVVVWq////////FVVVVVWqf///////FVVVVVVqv//////8BVVVVVVqn//////8BVVVVVVar//////wAVVVVVVap//////AAFVVVVVWqf////8AAAVVVVVWqn////wAAABVVVVVqqf///AAAAAAAAAAAAA//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"))
    };
    g.drawImage(img_on,90,35);  
  }
    else  
  {   //no swipe /slide
    g.setColor(colorange); 
    g.setFontVector(32).drawString(boton, 60, 65);
  }
  g.flip();    
  v_clicks++;  
}
function PrintBtn1(boton){ 
 console.log("Pressed BTN1");
 if (v_clicks=='0') PrintAreas();
 PrintUserInput("Button1"); 
 v_clicks++;
}

function PrintBtn2(boton){ 
 console.log("Pressed BTN2");
 if (v_clicks=='0') PrintAreas();
 PrintUserInput("Button2"); 
 v_clicks++;
}


function PrintHelp(){  
  console.log("********************************");
  console.log("Log: *** Print help in screen");
  ClearActiveArea();     
  g.setColor(0,1,0);  //green      
  g.setFontVector(v_font1size).drawString("To test the input, try :", 30, 90);
  g.setFontVector(v_font1size).drawString("Swipe right -->", 30, 115);
  g.setFontVector(v_font1size).drawString("Swipe left <--", 30, 130);
  g.setFontVector(v_font1size).drawString("Click Left area", 30, 145);
  g.setFontVector(v_font1size).drawString("Click Right area", 30,160);
  g.setFontVector(v_font1size).drawString("Click Middle area", 30,175);
  g.setFontVector(v_font1size).drawString("Press Button1 ", 30,190);
  g.setFontVector(v_font1size).drawString("Press Button2 ", 30,205);
  g.setFontVector(v_font1size).drawString("Press Button3 to Quit", 30,220);  
  g.flip();    
} 

function PrintAreas(){  
  console.log("********************************");
  console.log("Log: *** Print Areas in screen");
  ClearActiveArea();     
  g.setColor(0,1,0);  //green    
  g.drawLine(1, 140, 1, 200);//side border
  g.drawLine(239, 140, 239, 200);//side border
  g.drawLine(120, 140, 120, 200);//middle of areas
  g.setFontVector(v_font1size).drawString("BTN1", 195,45);
  g.setFontVector(v_font1size).drawString("BTN2", 195,125);
  g.setFontVector(v_font1size).drawString("Quit<--", 130,225);  
  g.setFontVector(v_font1size).drawString("BTN3", 195,225);  
  g.setFontVector(v_font1size).drawString("Middle area", 80,120);
  g.setFontVector(v_font1size).drawString("Left area", 15, 165);
  g.setFontVector(v_font1size).drawString("Right area", 140,165);    
  g.flip();    
}  

function UserInput(){
    Bangle.on('touch', function(button){ 
        switch(button){
            case 1:
               PrintUserInput("Touch 1");//left
                 break;
            case 2:
               PrintUserInput("Touch 2");//right
                 break;
            case 3: 
              PrintUserInput("Touch 3");//center 1+2
                break;
        }
    });
    //only the name of the function
    setWatch(PrintBtn1, BTN1, { repeat: true });
    setWatch(PrintBtn2, BTN2, { repeat: true });
    setWatch(Bangle.showLauncher, BTN3, { repeat: true });
    Bangle.on('swipe', dir => {  
      if(dir == 1) PrintUserInput("  --->");
      else PrintUserInput("  <---");
    });
    console.log("Log: Input conditions loaded");
} //end of UserInput

//Main code
 Bangle.loadWidgets();
 Bangle.drawWidgets();
 g.setColor(0,1,0);  //green    
 g.drawLine(60, 30, 180, 30); //optional line below widgets area
 g.flip(); 
 PrintHelp();
 UserInput();