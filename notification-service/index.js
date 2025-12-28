import amqp from 'amqplib'

async function start() {
    try {
        let connection = await amqp.connect("amqp://rabbitmq");
        let channel = await connection.createChannel();
        await channel.assertQueue("task_created");
        console.log("Notification Service Listening to messages");
        channel.consume("task_created", (msg) => {
            const taskData = JSON.parse(msg.content.toString());
            console.log("Notification: NEW TASK: ", taskData.title);
            console.log("Notification: NEW TASK: ", taskData);
            channel.ack(msg);
        })
    } catch (e) {
        console.log("RabbitMQ connection Error: ", e.message);
    }

}

start();