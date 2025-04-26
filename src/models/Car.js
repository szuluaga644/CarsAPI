const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Brand = require('./Brand');

const Car = sequelize.define('Car', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelo: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(100),
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  kilometraje: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brandId: {
    type: DataTypes.INTEGER,
    references: {
      model: Brand,
      key: 'id'
    },
    allowNull: false,
  }
}, {
  tableName: 'cars',
  timestamps: false,
});

Car.belongsTo(Brand, { foreignKey: 'brandId' });

module.exports = Car;
