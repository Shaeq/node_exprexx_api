const Joi = require('joi');
const express = require('express');
const app = express ();

app.use(express.json());

const courses =[
    {id: 1, name: 'courses1'},
    {id: 2, name: 'courses2'},
    {id: 3, name: 'courses3'},
];

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course ={
        id: courses.length +1 ,
        name: req.body.name
    };
    courses.push(course);
    res.send(course)
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!courses) res.status(404).send ('the courses with the given id is not found');

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);


});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!courses) res.status(404).send ('the courses with the given id is not found');
    res.send (course);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));