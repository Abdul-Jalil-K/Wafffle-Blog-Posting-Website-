import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import hijriDate from 'hijri-date';
import env from "dotenv";

env.config();

const app = express();
const port = process.env.PORT || 3000;
const HijriDate = hijriDate.default || hijriDate;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



let blogs = [];






function Blog(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
    this.postDate = this.rawDate.getDate() + '/' + this.rawDate.getMonth() + '/' + this.rawDate.getFullYear();

    let hours = this.rawDate.getHours();
    const minutes = this.rawDate.getMinutes();
    const seconds = this.rawDate.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    this.customTime = hours + ":" + formattedMinutes + ":" + formattedSeconds + ' ' + ampm;

    this.hijriDay = new HijriDate();
    this.fullHijriDate = this.hijriDay.getDate() + '/' + this.hijriDay.getMonth() + '/' + this.hijriDay.getFullYear() + ', ' + this.customTime;
    this.hijriPostDate = this.hijriDay.getDate() + '/' + (this.rawDate.getMonth() + 1) + '/' + this.hijriDay.getFullYear();
}

function createBlog(title, content) {
    let blog = new Blog(title, content);
    blogs.push(blog);
}

function deleteBlog(index) {
    blogs.splice(index, 1);
}

function editBlog(index, title, content) {
    blogs[index] = new Blog(title, content);
}


app.get("/", (req, res) => {
    res.render('index.ejs', { blogs: blogs });
});

app.get('/post', (req, res) => {
    res.render('post.ejs');
});

app.get('/view/:id', (req, res) => {
    const index = req.params.id;
    const blog = blogs[index];

    console.log(blog.title);
    res.render('view.ejs', { blogId: index, title: blog.title, content: blog.content, postDate: blog.postDate, hijriPostDate: blog.hijriPostDate});
});

app.get('/edit/:id', (req, res) => {
    const index = req.params.id;
    const blog = blogs[index];

    res.render('post.ejs', { blogId: index, title: blog.title, content: blog.content });
});

app.post("/post", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    createBlog(title, body);
    res.redirect('/');
});

app.post('/edit', (req, res) => {
    const index = req.body["index"];
    const title = req.body["title"];
    const content = req.body["body"];

    editBlog(index, title, content);
    res.redirect('/');
});


app.post('/delete', (req, res) => {
    let index = req.body['index'];
    deleteBlog(index);
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Wafffle is running on port ${port} smoothly.`);
    createBlog('The Beauty of Lorem Ipsum', 'Behold the majestic tapestry of Lorem Ipsum, the undisputed monarch of placeholder prose that effortlessly tames the wildest design layouts. Whenever its sacred syllables dance across a blank canvas, chaotic typography instantly surrenders to a harmonious symphony of meaningless elegance. It bravely masquerades as profound literature, tricking the untrained eye into believing a masterpiece has been written when, in truth, it is just beautifully organized gibberish. Printers and digital creators alike bow before its glorious, nonsensical wisdom, for without its comforting embrace, our mockups would crumble into a void of empty pixels. Long live the timeless sovereign of Dolor Sit Amet, the only text capable of saying absolutely nothing while simultaneously explaining everything.');
    createBlog('The Horror of Lorem Ipsum', 'Away with the wretched plague of Lorem Ipsum, that deceptive imposter of literature that suffocates truly authentic design with its mind-numbing monotony. Its lazy, repetitive syllables act like a hypnotic trap, lulling unsuspecting creators into a false sense of security while completely masking how real text would actually break a layout. It is a cowardly shield for uninspired mockups, pretending to hold substance when it is nothing more than a hollow echo of dead Latin masquerading as progress. Clients and developers alike are routinely blinded by its superficial charm, only to suffer a rude awakening when actual content inevitably shatters the pristine, artificial illusion. May the tyrannical reign of Dolor Sit Amet finally crumble into obscurity, freeing our designs from a soul-crushing void of meaningless pixels.')
});
