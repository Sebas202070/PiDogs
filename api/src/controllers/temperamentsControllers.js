const { default: axios } = require("axios")
const {Temperament} = require("../db")

/* const getAllTemperaments = async (name) => {
    let Temps = []
    const getAllData = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
    getAllData.forEach(t =>{
        Temps.push({
            name: t.temperament,
        })
    })
Temps.forEach(t => {
 Temperament.findOrCreate({
    where: {
        name: t.temperament
    }
})
})
return Temps
}
 */


const getTemperament = async () => {
    let api = await axios.get("https://api.thedogapi.com/v1/breeds");
    let allTemperament = await api.data
      .map((temp) => {
        return temp.temperament;
      })
      .join()
      .split(",");
  
    let temps = [];
   
    allTemperament.map((c) => {
      if (!temps.includes(c.trim()) && c) {
        temps.push(c.trim());
      }
    });
    console.log("11", temps)
    temps.map(async (d) => {
      await Temperament.findOrCreate({
        where: {
          name: d,
        },
        defaults: {
          name: d,
        },
      });
    });
    return temps
  };
  



module.exports = {
/*     getAllTemperaments */
getTemperament
}