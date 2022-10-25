let express = require("express");
let app = express();
let port = 3000;

let Datastore = require("nedb");
let db = new Datastore({ filename: "chats.db", timestampData: true });
db.loadDatabase();
let msgs = [];

app.use(express.json());

app.use("/", express.static("public"));

app.post('/message', (req, res) => {
    db.insert(req.body, (err, newDoc) => {
        if (err) {
            res.send({ "task": "failed" })
        } else {
            res.send({ "latestMsg": req.body });
        }
    });
    console.log(msgs);
});

app.get('/messages', (req, res) => {
    db.find({}).sort({ updateAt:1 }). exec(function(err,docs){
        if (err) {
            res.json({ task: "task failed" })
        } else {
            let obj = { msgs: docs };
            res.json(obj);
        }
    })
});

app.listen(port, () => {
    console.log("server is running on port " + port);
})
