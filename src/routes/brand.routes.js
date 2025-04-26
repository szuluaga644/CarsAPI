const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { body, param, validationResult } = require('express-validator');

// Middleware para validar la creación y actualización de marcas
const validateBrandInput = [
    body('name')
        .notEmpty().withMessage('El nombre de la marca es requerido')
        .isLength({ max: 20 }).withMessage('El nombre de la marca no puede tener más de 20 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                data: null,
                status: 400,
                message: 'Error de validación',
                errors: errors.array()
            });
        }
        next();
    }
];

// Middleware para validar el parámetro 'id'
const validateIdParam = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID de la marca debe ser un entero positivo'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                data: null,
                status: 400,
                message: 'Error de validación en el ID',
                errors: errors.array()
            });
        }
        next();
    }
];

// Ruta para crear una marca
router.post('/', validateBrandInput, brandController.createBrand);

// Ruta para obtener todas las marcas
router.get('/', brandController.getAllBrands);

// Ruta para obtener una marca por ID
router.get('/:id', validateIdParam, brandController.getBrandById);

// Ruta para actualizar una marca por ID (PUT)
router.put('/:id', validateIdParam, validateBrandInput, brandController.updateBrand);

// Ruta para eliminar una marca por ID (DELETE)
router.delete('/:id', validateIdParam, brandController.deleteBrand);

module.exports = router;