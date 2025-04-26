const Brand = require('../models/Brand');

// Controlador para crear una nueva marca
exports.createBrand = async (req, res) => {
    try {
        const brand = await Brand.create({ name: req.body.name });
        res.status(201).json({
            data: brand,
            status: 201,
            message: 'Marca creada exitosamente'
        });
    } catch (error) {
        console.error('Error al crear la marca:', error);
        let message = 'Error al crear la marca';
        let statusCode = 500;

        if (error.name === 'SequelizeUniqueConstraintError') {
            statusCode = 400;
            message = 'Ya existe una marca con ese nombre.';
        }

        res.status(statusCode).json({
            data: null,
            status: statusCode,
            message: message
        });
    }
};

// Controlador para obtener todas las marcas
exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll();
        res.status(200).json({
            data: brands,
            status: 200,
            message: 'Marcas obtenidas correctamente'
        });
    } catch (error) {
        console.error('Error al obtener las marcas:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al obtener las marcas'
        });
    }
};

// Controlador para obtener una marca por ID
exports.getBrandById = async (req, res) => {
    const { id } = req.params;
    try {
        const brand = await Brand.findByPk(id);
        if (brand) {
            res.status(200).json({
                data: brand,
                status: 200,
                message: 'Marca encontrada'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Marca no encontrada'
            });
        }
    } catch (error) {
        console.error('Error al obtener la marca:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al obtener la marca'
        });
    }
};

// Controlador para actualizar una marca por ID (PUT)
exports.updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const [updatedRows] = await Brand.update({ name }, {
            where: { id }
        });

        if (updatedRows > 0) {
            const updatedBrand = await Brand.findByPk(id);
            res.status(200).json({
                data: updatedBrand,
                status: 200,
                message: 'Marca actualizada exitosamente'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Marca no encontrada'
            });
        }
    } catch (error) {
        console.error('Error al actualizar la marca:', error);
        let message = 'Error al actualizar la marca';
        let statusCode = 500;

        if (error.name === 'SequelizeUniqueConstraintError') {
            statusCode = 400;
            message = 'Ya existe una marca con ese nombre.';
        }

        res.status(statusCode).json({
            data: null,
            status: statusCode,
            message: message
        });
    }
};

// Controlador para eliminar una marca por ID (DELETE)
exports.deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Brand.destroy({
            where: { id }
        });
        if (deletedRows > 0) {
            res.status(200).json({
                data: null,
                status: 200,
                message: 'Marca eliminada exitosamente'
            });
        } else {
            res.status(404).json({
                data: null,
                status: 404,
                message: 'Marca no encontrada'
            });
        }
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        res.status(500).json({
            data: null,
            status: 500,
            message: 'Error al eliminar la marca'
        });
    }
};