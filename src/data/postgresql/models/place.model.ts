import { DataTypes } from "sequelize";
import db from "../connection";

const Place = db.define("Places", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.ARRAY(DataTypes.FLOAT),
    allowNull: false,
  },
});

export default Place;
