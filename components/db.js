var fs = require("fs"),
    file = "./components/db_test.db",
    exists = fs.existsSync(file),
    sqlite3 = require("sqlite3").verbose(),
    db = new sqlite3.Database(file);
    
    //console.log(exists);
    
db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE Stuff (thing TEXT) ");
    }

    
    var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
    
        //Insert random data
    var rnd;
    for (var i = 0; i < 10; i++) {
        rnd = Math.floor(Math.random() * 10000000);
        stmt.run("Thing #" + rnd);
    }

    stmt.finalize();
    
    db.each("SELECT rowid AS id, Thing FROM Stuff", function(err, row) {
        if(err){
            console.log(err);
        }
        else{
            //console.log(row);
            console.log(row.id + ": " + row.thing);
        }
    });
});

db.close();