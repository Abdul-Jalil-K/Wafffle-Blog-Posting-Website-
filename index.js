import ejs from "ejs";
import express from "express";
import bodyParser from "body-parser";
import hijriDate from 'hijri-date';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



let blogs = [];

function Blog(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.hijriDay = new HijriDate();
    this.date = this.rawDate.toLocaleString();
    this.islamicDate = this.hijriDay.toLocaleString();
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

    res.render('view.ejs', { blogId: index, title: blog.title, content: blog.content });
});

app.get('/edit/:id', (req, res) => {
    const index = req.params.id;
    const blog = blogs[index];

    res.render('create.ejs', { blogId: index, title: blog.title, content: blog.content });
});

app.post("/post", (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    createBlog(title, content);
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
});
