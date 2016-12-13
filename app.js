var express = require("express"),
    app = express(),
    fs = require("fs"),
    path = require("path");
var port = process.env.PORT || 5000;

console.log(__dirname + '/sqlite1/public');
console.log(fs.existsSync(__dirname + '/public'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));    
app.get('/', function(req, res){
    var obj = 
    [
        {item:"Music and a longer bit of text to see .",dttm:"01/01/17"},
        {item:"Art",dttm:"12/12/17"},
        {item:"Food",dttm:"06/06/17"}
    ];
    
    var text = "What I did.";
    res.render('index',{
        events:obj,
        header:text
    });
});

app.listen(port, function (err) {
    if(err){console.log(err);}
    console.log('running server on port ' + port);
});