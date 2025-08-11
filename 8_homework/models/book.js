import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Book = sequelize.define(
  'Book',
  {
    id: { 
      allowNull: false,
      autoIncrement: true, 
      primaryKey: true, 
      type: DataTypes.INTEGER,
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    author: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    year: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
    }
  },
  {
    tableName: 'Books',
    timestamps: true,
  }
);


export default Book;
