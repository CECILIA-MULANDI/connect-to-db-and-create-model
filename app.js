const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
        res.json({ message: "hi there suckers" })
    })
    // get all names
app.get('/api/names', async(req, res) => {
        const allnames = await MorePractice.find()
        return res.status(200).json(allnames)
    })
    // get a name 
app.get('/api/names/:id', async(req, res) => {
        const { id } = req.params;
        const name = await MorePractice.findById(id);
        return res.status(200).json(name)
    })
    // post
app.post("/api/names", async(req, res) => {
    const newname = new MorePractice({...req.body })
    const insertname = await newname.save()
    return res.status(201).json(insertname)
})
mongoose.set('strictQuery', false);
const conn = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(5000, () => console.log('connected on port 5000'))
    } catch (err) {
        console.log(err)
    }


}
conn();


const Practice = new mongoose.Schema({
    name: String,
    email: String

})

const MorePractice = mongoose.model('MoreAccounts', Practice)
module.exports = MorePractice