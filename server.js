const express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const uri = "mongodb+srv://root:123@cluster0-vtyiw.mongodb.net/test?retryWrites=true&w=majority";

Mongoose.connect(uri, {useNewUrlParser: true}, function(error){
    if (error) {
        console.log('Error ', error);
    } else {
        console.log('conectado a la db');
    }
})

const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const port = 3001;



const Event = Mongoose.model("event", {
        id: String,
        activityDate: String,
        eventData: String,
        eventType: String,
        shouldBeSave: Boolean,
        captureData: Object
});

/* const EventSchema = new Mongoose.Schema({
    id: String,
    activityDate: String,
    eventData: String,
    eventType: String,
    shouldBeSave: Boolean,
    captureData: Object
});
var Event = Mongoose.model('Event', EventSchema); */


app.get('/', (req, res) => res.send('Hello world'));
app.post('/event', async (req, res) => {
    try {
        //var event = new Event(req.body);
        // var result = event.save();
        Event.create(
            req.body,
            (error, data) => {
                if (error) {
                    console.log('Error creando el evento');
                    console.log(error);
                } else {
                    console.log('Evento creado correctamente');
                    console.log(data);
                    res.send(data);
                }
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

app.get('/event', async (req, res) => {
    try {
        Event.find(
            {},
            (error, data) => {
                if (error) {
                    console.log('Error obteniendo los eventos');
                    console.log(error);
                } else {
                    console.log('Eventos encontrados');
                    console.log(data);
                    res.send(data);
                }
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

app.get('/event/:id', async (req, res) => {
    try {
        var id = req.params.id;
        Event.findById(
            {_id: id},
            (error, data) => {
                if (error) {
                    console.log('Error obteniendo los eventos');
                    console.log(error);
                } else {
                    console.log('Eventos encontrados');
                    console.log(data);
                    res.send(data);
                }
            }
        );
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}`));