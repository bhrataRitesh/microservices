import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
mongoose.connect('mongodb://mongo:27017/users').then(() => console.log('Connected to MongoDB')).catch((e) => console.log('MongoDB connection error ', e));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

app.post('/users', async (req, res) => {
    const { email, name } = req.body;
    try {
        const user = new User({ name, email });
        await user.save();
        res.status(200).json(user);
    } catch (e) {
        console.error('Error saving: ', e);
        res.status(500).json({ error: 'Internal server Error' });
    }
})
app.get('/users', async (req, res) => {
    const users = await User.find();
    return res.status(200).json({ users: users });
})
app.get('/', (req, res) => {
    res.send('Hey babe');
})


app.listen(port, () => {
    console.log(`listing to ${port}`)
})