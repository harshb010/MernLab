const express = require('express')
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/sample').then(() => {
    console.log('Connected to database');
    const Schema =mongoose.Schema
    const studentSchema = new Schema({id:Number,name:String,addr:String,stream:String,year:Number})
    const studentmodel = mongoose.model('student',studentSchema);
    app.use(express.json());
app.get('/get',async (req, res) =>{
    try {
        const students = await studentmodel.find();
        res.send(students);
    }
    catch (err) {
        console.log("Data not Found");
    }
   
});
app.post("/addstudent", async (req, res) => {
  
    try {
        await studentmodel.create(req.body);
        res.send("Student added successfully");
    }
    catch (err) {
        console.log("No data");
    }
});

app.delete("/delete/:id", async (req, res) => {
   
    try {
        const id = req.params.id;
        const deletedStudent = await studentmodel.deleteMany({ id: id }); 
        if (deletedStudent.deletedCount === 0) {
          return res.status(404).send('No students found with that name');
        }
        res.json({ message: `${deletedStduent.deletedCount} students deleted` });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
});

app.put("/update/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const updateData = req.body; 
    
        const foundStudent = await studentmodel.findOne({id: id});
        if (!foundStudent) {
          return res.status(404).send('Student not found with that name');
        }
        
        foundStudent.name = updateData.name || foundStudent.name;
        foundStudent.addr = updateData.addr || foundStudent.addr;
        foundStudent.stream = updateData.stream || foundStudent.stream;
        foundStudent.year = updateData.year || foundStudent.year;
   
        const updatedStudent = await foundStudent.save();
        res.json(updatedStudent);

      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
});

});

app.get('/start', (req, res) => {
console.log('start');
res.end('Welcome');
});
app.listen(8000,()=>{
    console.log("started");

});

