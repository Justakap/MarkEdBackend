// to get data in react you can use filter in react 

const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const port = 5000;
// const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const UserModel = require('./models/user');
// const vidModel = require('./models/videos');
// const subjectModel = require('./models/subject');
var jwt = require('jsonwebtoken');
app.use(cors())

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


JWT_SECRET = 'kyakarega#janke'


app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true })); // Fix typo
app.use(bodyParser.json());

app.use(express.json());
app.set('view engine', 'ejs'); // Fix typo
app.set('views', path.join(__dirname, 'views'));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://anantk15:root@cluster0.972saxu.mongodb.net/videos');
    app.get('/', (req, res) => {

        res.status(200).render('main.ejs');
    })
    app.get('/subject', (req, res) => {
        res.status(200).render('subject.ejs');
    })

    app.post('/register', async (req, res) => {

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        let data = {
            name: req.body.name,
            email: req.body.email,
            password: secPass,

            // Add other fields as needed
        };

        UserModel.create(data)
            .then((result) => {
                console.log(result);
                // res.redirect('/register');

            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error'); // Send an appropriate error response
            });


        const authToken = jwt.sign(data, JWT_SECRET)
        console.log(authToken)

        res.send({ authToken })


        // console.log(req.body);
    })
    app.post('/signup', (req, res) => {
        const { name, email, password } = req.body;

        // Here you can perform the signup logic, for example, save the data to a database
        let data = { name, email, password };

        UserModel.create(data)
            .then((result) => {
                console.log(result);
                // res.redirect('/register');

            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error'); // Send an appropriate error response
            });
    });

    app.post('/addVideo', (req, res) => {
        let data = {
            branch: req.body.branch,
            semester: req.body.semester,
            subject: req.body.subject,
            count: req.body.count,
            source: req.body.source,
            notesUrl: req.body.notesUrl,
            // Add other fields as needed
        };
    
        vidModel.create(data)
            .then((result) => {
                console.log(result);
                res.redirect('/');
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error'); // Send an appropriate error response
            });
        console.log(req.body);
    });

    // login


    app.post('/login',
        async (req, res) => {
            const [email, password] = req.body

            try {
                let user = UserModel.findOne({ email })
                if (!user) {
                    return res.status(400).json({ error: "Please add correct credentials" })
                }
                const passwordCompare = bcrypt.compare(password, user.password);
                if (!passwordCompare) {
                    return res.status(400).json({ error: "Please add correct credentials" })

                }
                res.send(data);
            } catch (error) {

            }
        })
    // get User details logon req


    // add a subject 


    app.post('/addSubject', (req, res) => {
        const { name, semester, image, branch } = req.body;

        // Here you can perform the signup logic, for example, save the data to a database
        let data = { name, semester, image, branch };

        subjectModel.create(data)
            .then((result) => {
                console.log(result);
                // res.redirect('/register');

            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Internal Server Error'); // Send an appropriate error response
            });
    });

    app.listen(port, () => {
        console.log(`Server started at port ${port}`);
    });
}
