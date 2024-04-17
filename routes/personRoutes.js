const express = require('express')
const router = express.Router();

const Person = require('../models/person')

router.post('/', async(req,res)=>{
    try{
        const data = req.body // Assuming the request body contains the person data

        //Create new person document using mongoose model
        const newPerson = new Person(data);
    
        //Save the new person
        const response= await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log("error Saving the data", error);
        res.status(500).json({ error: 'Internal server error' })
    }

})


router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data)
    }catch(error){
        console.log("error fetching the data", error);
        res.status(500).json({ error: 'Internal server error' })

    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; //extract the work type from URL parameter
        if (workType == 'Chef' || workType == 'Waiter' || workType == "Manager") {

            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "invalid work type" })
        }
    } catch (err) {
        console.log("error fetching the data", err);
        res.status(500).json({ err: 'Internal server error' })
    }
})

router.put('/:id',async(req,res)=>{
    try{

        const personID = req.params.id; // extract id from url
        const updatedPersonData = req.body //Updates data for the person

        const response = await Person.findByIdAndUpdate(personID,updatedPersonData, {
            new: true, // return the updated value
            runValidators : true,
        })

        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
            console.log("data updated")
            res.status(200).json(response)
    }catch(err){
        console.log("error fetching the data", err);
        res.status(500).json({ err: 'Internal server error' })
    }
})

router.delete('/:id',async(req,res)=>{
    try{

          const personID = req.params.id;

          const response = await Person.findOneAndDelete(personID)
          if(!response){
            return res.status(404).json({error:"Person not found"})
        }
            console.log("Data deleted")
            res.status(200).json({message:"Person deleted succesfully"})
    }catch(err){
        console.log("error fetching the data", err);
        res.status(500).json({ err: 'Internal server error' })
    }
})

module.exports = router