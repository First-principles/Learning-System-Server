const app = require("./server");
const { PORT } = require("../config/config.json");

//SECTION The APP is listenning on 5000 Port
var server = app.listen(process.env.PORT || PORT, function() {
    console.log('Listening on port ' + server.address().port);
});