var models = require('./server.js').models

var Save = [
    {name: "Guido", email: "guido13pauletti@gmail.com"},
    {name: "Guido1", email: "guido10pauletti@gmail.com"},
    {name: "Guido2", email: "guido11pauletti@gmail.com"},
    {name: "Guido3", email: "guido12pauletti@gmail.com"},
    {name: "Santi1", email: "sanit13pauletti@gmail.com"},
    {name: "Santi2", email: "santi11pauletti@gmail.com"},
    {name: "Santi3", email: "santino10pauletti@gmail.com"},
    {name: "Santi", email: "santanamopauletti@gmail.com"},
    {name: "Fernando", email: "kingferpauletti@gmail.com"},
];

Save.map(obj => {
    models.Profile.create(obj, (err, created) => {
        console.log("Created?", created);
    })
})