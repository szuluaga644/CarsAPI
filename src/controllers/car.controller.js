const Car = require('../models/Car');
const Brand = require('../models/Brand');
const { Op } = require('sequelize');

// Controlador para obtener la lista paginada de automóviles
exports.getAllCars = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Car.findAndCountAll({
            include: Brand,
            limit,
            offset
        });

        res.status(200).json({
            data: {
                cars: rows,
                total: count,
                page,
                totalPages: Math.ceil(count / limit)
            },
            status: 200,
            message: 'Autos obtenidos correctamente'
        });
    } catch (error) {
        console.error('Error al obtener los autos:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al obtener los autos'
        });
    }
};

// Controlador para obtener los detalles de un automóvil específico
exports.getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id, { include: Brand });
        if (car) {
            res.status(200).json({
                data: car,
                status: 200,
                message: 'Auto encontrado'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Auto no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al obtener el auto:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al obtener el auto'
        });
    }
};

// Controlador para agregar un nuevo automóvil
exports.createCar = async (req, res) => {
    try {
        const car = await Car.create(req.body);
        res.status(201).json({
            data: car,
            status: 201,
            message: 'Auto creado exitosamente'
        });
    } catch (error) {
        console.error('Error al crear el auto:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al crear el auto'
        });
    }
};

// Controlador para actualizar un automóvil por ID
exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { modelo, descripcion, precio, kilometraje, brandId } = req.body;

    try {
        const [updatedRows] = await Car.update({ modelo, descripcion, precio, kilometraje, brandId }, {
            where: { id }
        });

        if (updatedRows > 0) {
            const updatedCar = await Car.findByPk(id, { include: Brand });
            res.status(200).json({
                data: updatedCar,
                status: 200,
                message: 'Auto actualizado exitosamente'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Auto no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al actualizar el auto:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al actualizar el auto'
        });
    }
};

// Controlador para eliminar un automóvil por ID
exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Car.destroy({
            where: { id }
        });
        if (deletedRows > 0) {
            res.status(200).json({
                data: null,
                status: 200,
                message: 'Auto eliminado exitosamente'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Auto no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al eliminar el auto:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al eliminar el auto'
        });
    }
};

// Controlador para filtrar automóviles por modelo, precio y kilometraje
exports.filterCars = async (req, res) => {
    try {
        const whereClause = {};
        if (req.query.modelo) {
            whereClause.modelo = { [Op.iLike]: `%${req.query.modelo}%` }; // Búsqueda insensible a mayúsculas/minúsculas
        }
        if (req.query.precio) {
            whereClause.precio = parseInt(req.query.precio);
        } else if (req.query.precio_min && req.query.precio_max) {
            whereClause.precio = { [Op.between]: [parseInt(req.query.precio_min), parseInt(req.query.precio_max)] };
        } else if (req.query.precio_min) {
            whereClause.precio = { [Op.gte]: parseInt(req.query.precio_min) };
        } else if (req.query.precio_max) {
            whereClause.precio = { [Op.lte]: parseInt(req.query.precio_max) };
        }
        if (req.query.kilometraje) {
            whereClause.kilometraje = parseInt(req.query.kilometraje);
        } else if (req.query.kilometraje_min && req.query.kilometraje_max) {
            whereClause.kilometraje = { [Op.between]: [parseInt(req.query.kilometraje_min), parseInt(req.query.kilometraje_max)] };
        } else if (req.query.kilometraje_min) {
            whereClause.kilometraje = { [Op.gte]: parseInt(req.query.kilometraje_min) };
        } else if (req.query.kilometraje_max) {
            whereClause.kilometraje = { [Op.lte]: parseInt(req.query.kilometraje_max) };
        }

        const cars = await Car.findAll({
            where: whereClause,
            include: Brand
        });

        res.status(200).json({
            data: cars,
            status: 200,
            message: 'Autos filtrados correctamente'
        });
    } catch (error) {
        console.error('Error al filtrar los autos:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al filtrar los autos'
        });
    }
};