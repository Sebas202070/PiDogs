const { getAllDogs, getDogsById, getDogsByName } = require("../controllers/dogsControllers")
const {Dog, Temperament} = require("../db")


const getDogsHandler = async (req, res) => {
    try {
        const {name} = req.query
    const result = name? await getDogsByName(name) : await getAllDogs()
    res.status(200).json({result, status:"Success!!"})
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }

}


const getDogsByIdHandler = async (req, res) => {
    try {const {id} = req.params
    const source = isNaN(id)? "bdd" : "api"
    const result = await getDogsById(id, source)
    res.status(200).json({result, status:"Success!!"})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }


}

const postDogsHandler = async (req,res) => {
    try {const {name, height, weight,life_span, temperaments } = req.body
    const newDOG = await Dog.create(({name, height, weight,life_span}))
    const temperamentDb = await Temperament.findAll({
        where: {name: temperaments}
            
        
    })
   /*  console.log("1",temperamentDb) */
    newDOG.addTemperament(temperamentDb)
   /*  console.log("2", newDOG ) */
    res.status(200).json({newDOG, status: "Success!!"})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}


module.exports = {
    getDogsHandler,
    getDogsByIdHandler,
    postDogsHandler
}