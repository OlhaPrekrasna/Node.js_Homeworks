import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const app = sequelize.define(
  'app',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Apps',
    timestamps: false,
  }
);

export default app;
