const express = require('express')
const router = express.Router()

const MenuItem = require('../models/menuItem')

router.post('/', async(req,res)=>{
    try{
            const data= req.body //boday parser

            const newItem = new MenuItem(data) //setting scheme

            const response = await newItem.save() //assign/saving  schema to response
            console.log("new item added to menu")
            res.status(200).json(response)
    }catch(err){
        console.log("error saving data",err);
        res.status(200).json({ error: 'Internal server error' })
    }
})

router.get('/', async(req,res)=>{
    try{
        const Items = await MenuItem.find()
        console.log("menu items fetched")
        res.status(200).json(Items)
    }catch(err){
        console.log("error fetching the data", error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/:taste', async(req,res)=>{
    try{
        const taste= req.params.taste;
        if(taste == 'Sweet' || taste == 'Spicy' || taste == 'Sour' ){
            const response = await MenuItem.find({taste : taste})
            res.status(200).json(response)
        }else{
            res.status(404).json({error:'invalid taste'})
        }

    }catch(error){
        console.log("error fetching the data", error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.put('/:id',async(req,res)=>{
    try{

        const menuID = req.params.id; // extract id from url
        const updatedItemData = req.body //Updates data for the menu

        const response = await MenuItem.findByIdAndUpdate(menuID,updatedItemData, {
            new: true, // return the updated value
            runValidators : true,
        })

        if(!response){
            return res.status(404).json({error:"menu not found"})
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

          const menuID = req.params.id;

          const response = await MenuItem.findOneAndDelete(menuID)
          if(!response){
            return res.status(404).json({error:"Item not found"})
        }
            console.log("Data deleted")
            res.status(200).json({message:"Item deleted succesfully"})
    }catch(err){
        console.log("error fetching the data", err);
        res.status(500).json({ err: 'Internal server error' })
    }
})

module.exports = router