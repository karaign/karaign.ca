
  var sites = [
  "https://www.rrrgggbbb.com/",
  "http://www.blankwindows.com/",
  "http://www.staggeringbeauty.com/",
  "http://www.omfgdogs.com/",
  "http://ninjaflex.com/",
  "https://isitchristmas.com/",
  "http://www.randomcolour.com/",
  "http://www.hasthelargehadroncolliderdestroyedtheworldyet.com/",
  "http://www.ihasabucket.com/",
  "http://www.eelslap.com/",
  "http://www.koalastothemax.com/",
  "http://www.sometimesredsometimesblue.com/",
  "http://www.patience-is-a-virtue.org/",
  "https://mrdoob.com/lab/javascript/effects/ie6/",
  "https://www.pointerpointer.com",
  "http://www.hmpg.net/",
  "https://mrdoob.com/lab/javascript/effects/water/02/",
  "http://tiffzhang.com/startup/index.html",
  "http://thatsmathematics.com/mathgen/paper.php?nameType[1]=generic&nameType[2]=generic&nameType[3]=famous&nameType[4]=generic&format=pdf",
  "http://pixelsfighting.com/",
  "https://old.reddit.com/r/Ooer/",
  "http://endless.horse/"
  ];
  
  function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  function openNextSite() {
    open(randomElement(sites));
  }
