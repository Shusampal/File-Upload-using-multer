const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cors({
    "origin" : "*"
}))

var posts = [];
var counter = 0;
var logins = [];

// Home Route ( Just to test )

app.get('/', (req, res) => {
    res.render('home');
})


// Get login page

app.get('/login', (req, res) => {
    res.render('login');
})


// Route to store login details and redirect

app.post('/login', (req, res) => {

    logins.push(req.body);
    res.redirect('/create');
})


// Get the create post form

app.get('/create', (req, res) => {
    res.render('create');
})


// Post Route To create the post

app.post('/create', upload.single('image'), (req, res) => {

    if (posts.length === 0) {
        counter = 1;
    } else {

        counter++;
    }
    const { title, image, text } = req.body;
    var currentDateInMilis = new Date().getTime();
    var obj = {
        id: counter,
        title,
        image,
        text,
        currentDateInMilis
    }

    posts.push(obj);
    res.status(200).json({ status: true, message: 'Post created', post: obj });

})


// To get the all posts

app.get('/posts', (req, res) => {

    if (posts.length === 0) {
        res.status(200).json({ status: true, message: 'no posts to show ', posts });
    } else {

        res.status(200).json({ status: true, posts });
    }

})


// Get Form to delete a post

app.get('/delete', (req, res) => {
    res.render('delete');
})


// To delete a post

app.post('/delete', (req, res) => {
    const id = req.body.id;

    posts = posts.filter((post) => post.id != id);
    res.status(300);
    res.redirect('/posts');

})



// To listen the Application

app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}...`);
})
