
$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("slow");
    });
  });

  function scrollWin() {
    window.scrollTo(0, 0);
  }

  var tStart = 100 // Start transition 100px from top
  , tEnd = 500   // End at 500px
  , cStart = [255, 0, 0]  // Red
  , cEnd = [0, 0, 255]   // Blue
  , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[2] - cStart[2]];

$(document).ready(function(){
    $(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
        $("body").css('background-color', 'rgb(' + cBg.join(',') +')');
    });
});
  
/* BG from Red to Blue to White*/
/*
var tStart = 100 // Start transition 100px from top
  , tEnd = 500   // End at 500px
  , cStart = [255, 0, 0]  // Red
  , cMid = [0,0,0]
  , cEnd = [0, 0, 255]   // Blue
  , cDiffAB = [cMid[0] - cStart[0], cMid[1] - cStart[1], cMid[2] - cStart[2]]
  , cDiffBC = [cEnd[0] - cMid[0], cEnd[1] - cMid[1], cEnd[2] - cMid[2]];

$(document).ready(function(){
    $(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [Math.round(cStart[0] + cDiffAB[0] * p), Math.round(cStart[1] + cDiffAB[1] * p), Math.round(cStart[2] + cDiffAB[2] * p)];
        var cBg2 = [Math.round(cStart[0] + cDiffBC[0] * p), Math.round(cStart[1] + cDiffBC[1] * p), Math.round(cStart[2] + cDiffBC[2] * p)];
        $("body").css('background-color', 'rgb(' + cBg.join(',') +')');
    });
});
*/  