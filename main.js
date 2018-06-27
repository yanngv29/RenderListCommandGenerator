var options = {
    //bbox : [-21.45124,55.19719,-20.80371,55.89070], //[south,west,north,east] La Réunion
    //bbox : [-13.03572,45.02732,-12.61393,45.33906], //[south,west,north,east]  Mayotte
    //bbox : [15.77670,-61.86005,16.54700,-60.96741], //[south,west,north,east]  Guadeloupe
    //bbox : [14.36049,-61.24070,14.89732,-60.77927], //[south,west,north,east]  Martinique
    bbox : [2.01036,-54.66399,5.95510,-51.44500], //[south,west,north,east]  Guyane
    zoom : {
        max : 17,
        min : 9
    }
};

var cmdPrinter = require('./render-list-command-printer.js');

//execute cmdPrinter
cmdPrinter.run(options,function(err){
  console.log(err);
  process.exit();
});
