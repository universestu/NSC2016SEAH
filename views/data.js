var microgear = require('microgear');
fs = require('fs');

const KEY    = "Djmh3H2yte6CIrW";
const SECRET = "43J9u4sJmMe34omGvLdu51JF74prLT";
const APPID     = "NSC2016SEAH";

var microgear = MicroGear.create({
    key : KEY,
    secret : SECRET
});

microgear.on('connected', function() {
    console.log('Connected...');
    microgear.setalias("mygear");
    setInterval(function() {
        console.log('OK!!');
    },1000);
});

microgear.on('message', function(topic,body) {
    console.log('incoming : '+topic+' : '+body);

});

microgear.on('closed', function() {
    console.log('Closed...');
});

microgear.connect(APPID);