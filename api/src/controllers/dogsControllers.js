const axios = require("axios")
const {Dog, Temperament} = require("../db")
const {Op} = require("sequelize")


const getAllDogs = async () => {
    const getAllApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
    const data = getAllApi.map(e => { return {
        id: e.id,
        name: e.name,
        image: e.image,
        weight: e.weight,
        height: e.height,
        life_span: e.life_span,
        temperament: e.temperament

    }

    }

  
    )
    const getAllDb = await Dog.findAll({
   
        include: [
          {
            model: Temperament,
            attributes: ["name"],
            through: {
              attributes: []
            }}]})

            const result = [...data, ...getAllDb]
            return result;
}

const getDogsById = async (id, source) => {
    let data
    if(source === "bdd") {
         dogdetail = await Dog.findByPk(id, {
            include: [
                {
                  model: Temperament,
                  attributes: ["name"],
                  through: {
                    attributes: []
                  }}]
                  
                  }
    
            

        )
    }
    else{
       const data1= (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`))
data = data1.data
dogdetail=
{
    id: data.id,
    name: data.name,
    image: data.reference_image_id,
    weight: data.weight,
    height: data.height,
    life_span: data.life_span,
    temperament: data.temperament,
}}

    
    return dogdetail
}

const getDogsByName = async (name) => {
    const basadate = await Dog.findAll(
        {
     
          include: [
            {
              model: Temperament,
              attributes: ["name"],
              through: {
                attributes: []
              }
            }
          ]
        ,

        where:{name:{[Op.like]:`${name}`}}})
        
        console.log("basadate", basadate)
      const getAllDogsApi =  (
          await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
        ).data; 
      console.log("getall", getAllDogsApi)
       
        return [...basadate, ...getAllDogsApi]
      
}



module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName,


}