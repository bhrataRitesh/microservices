import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import amqp from 'amqplib'

const app = express();
const port = 4000;

app.use(bodyParser.json());
mongoose.connect('mongodb://mongo:27017/tasks').then(() => console.log('Connected to MongoDB')).catch(e => console.log('Error connecting task DB ', e));

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Task = mongoose.model('Task', TaskSchema);

let channel, connection;

async function connectRabbitMQWithRetry(retries = 5, delay = 3000) {
    while (retries) {
        try {
            connection = await amqp.connect("amqp://rabbitmq");
            channel = await connection.createChannel();
            await channel.assertQueue("task_created");
            console.log("Connected to RabbitMQ");
            return;
        } catch (e) {
            console.log("RabbitMQ connection Error: ", e.message);
            retries--;
            console.log("Retrying again: ", retries);
            await new Promise(res => setTimeout(res, delay));
        }
    }
}


app.post('/tasks', async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const task = new Task({ title, description, userId });
        await task.save();
        const message = { taskId: task._id, userId, title };
        
        if (!channel) return res.status(503).json({ error: "RabbitMQ not connected" });
        
        channel.sendToQueue('task_created',Buffer.from(JSON.stringify(message)));
        
        res.status(200).json(task);
    } catch (e) {
        console.error('Error saving: ', e);
        res.status(500).json({ error: 'Internal server Error' });
    }
})
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    return res.status(200).json({ tasks: tasks });
})

app.get('/', (req, res) => {
    res.send('Welcome Babe');
})

app.listen(port, () => {
    console.log(`hearing port ${port}`)
    connectRabbitMQWithRetry();
})