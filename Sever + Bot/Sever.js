const express = require('express');
const app = express();
bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const port = 3434;

const messages = [
    {
        id: 1,
        name: "Sang",
        content: "Sang Crush Dung",
        read: false
    },
    {
        id: 2,
        name: "Nam",
        content: "Nam Crush Yen",
        read: false
    },
    {
        id: 3,
        name: "Khang",
        content: "Khang *** Goi",
        read: false
    }
]


app.get('/', (req, res) => res.send('KhoiDepTrai'));

app.get('/messages', (req, res) => {
    res.json(messages);
});


app.get('/messages/:id', (req, res) => {
    //console.log(req.params.id);
    const { id: messageId } = req.params;
    const message = messages.find(msg => msg.id === parseInt(messageId));
    if(!message){
        return res.status(404).json({
            note:"Message not found"
        })
    }
    res.json(message);
});

app.post ('/messages',(req, res) => {
    const { name, content, read } = req.body;
    if(!name || !content) {
        return res.status(422).json({
            note: 'Name or content must exist'
        })
    }

    //tao tin nhan moi

    const newMessage = {
        id: messages.length + 1,
        name,
        content,
        read: Boolean(read)
    }
    messages.push(newMessage);
    res.status(200).json({
        note: `the message with the id : ${newMessage.id} is now created`,
        messages,
        createdMessage: newMessage
    })
})

app.delete ('/messages/:id', (req, res) => {
    const {id} = req.params;
    const messageId = parseInt(id);
    const messageIndex = messages.findIndex(msg => msg.id === parseInt(messageId));
    if(!messages.includes(messages[messageIndex])){
        return res.status(404).json({
            note:"Message not found"
        })
    }

    const messageToDelete = messages[messageIndex];


    messages.splice(messageIndex, 1);
    res.status(200).json({
        note: `the message with: ${messageId} success delete`,
        messages,
        deleteMessage: messageToDelete
    });

});


app.listen(port, () => {
    console.log(`sever is runnning on : ${port}`);
})