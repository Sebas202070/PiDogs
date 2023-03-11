const { DataTypes, UUID, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIlOzFOaFyozELf7DT-Ua6G4PB1Svmkk-SA&usqp=CAU"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
    },
    life_span: {
      type: DataTypes.STRING
    }



  });
};
