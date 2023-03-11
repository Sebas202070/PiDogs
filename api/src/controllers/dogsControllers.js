const axios = require("axios")
const {Dog, Temperament} = require("../db")
const {Op} = require("sequelize")


const getAllDogs = async () => {
    const getAllApi = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
    const data = getAllApi.map(e => { return {
        id: e.id,
        name: e.name,
        image: e.image.url,
        weight: e.weight.metric,
        height: e.height.metric,
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
            console.log("back", (getAllDb))
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
       const data1= (await axios.get(`https://api.thedogapi.com/v1/breeds/${Number(id)}`))
data = data1.data
dogdetail=
{
    id: data.id,
    name: data.name,
    image:"https://cdn2.thedogapi.com/images/" + data.reference_image_id + "." + "jpg",
    weight: data.weight.metric,
    height: data.height.metric,
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
        
     /*    console.log("basadate", basadate) */
      const getAllDogsApi =  (await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)).data; 
      const data1 = getAllDogsApi.map(e => { return {
        id: e.id,
        name: e.name,
        image:"https://cdn2.thedogapi.com/images/" + e.reference_image_id + "." + "jpg",
        weight: e.weight.metric,
        height: e.height.metric,
        life_span: e.life_span,
        temperament: e.temperament

    }

    }

  
    )
     
     
     
      /*  console.log("getall", getAllDogsApi) */
       
        return [...basadate, ...data1]
      
}



module.exports = {
    getAllDogs,
    getDogsById,
    getDogsByName,


}