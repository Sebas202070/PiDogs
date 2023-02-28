const { /* getAllTemperaments,  */getTemperament } = require("../controllers/temperamentsControllers");
const {Temperament} = require("../db");

const getTemperamentsHandler = async (req, res) => {
/*     try {const getAllTemps = await getTemperament()
        res.status(200).json({getAllTemps, status: "Success!!"})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
 */
    const dogs = await getTemperament();

/*     const allTemperaments = await Temperament.findAll(); */
    /* console.log(allTemperaments) */
/*     const filteredTemperaments = await allTemperaments.map((obj) => obj.name); */
    res.status(200).send(dogs);
  
}

module.exports = {getTemperamentsHandler}