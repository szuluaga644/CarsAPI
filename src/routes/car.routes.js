const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const { param, query, body, validationResult } = require('express-validator');

// Middleware para registrar logs de la lista de carros
const logCarListRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] GET /api/cars - Page: ${req.query.page || 1}, Limit: ${req.query.limit || 10}`);
    next();
};

// Middleware de validación para la creación y actualización de coches
const validateCarInput = [
    body('modelo')
        .notEmpty().withMessage('El modelo es requerido')
        .isLength({ max: 30 }).withMessage('El modelo no puede tener más de 30 caracteres'),
    body('descripcion')
        .isLength({ max: 100 }).optional().withMessage('La descripción no puede tener más de 100 caracteres'),
    body('precio')
        .notEmpty().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número entero no negativo'),
    body('kilometraje')
        .notEmpty().withMessage('El kilometraje es requerido')
        .isInt({ min: 0 }).withMessage('El kilometraje debe ser un número entero no negativo'),
    body('brandId')
        .notEmpty().withMessage('El brandId es requerido')
        .isInt().withMessage('El brandId debe ser un número entero'),
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
        .isInt({ min: 1 }).withMessage('El ID del coche debe ser un entero positivo'),
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

// Rutas para carros
router.get('/', logCarListRequest, carController.getAllCars);
router.get('/filter', carController.filterCars);
router.get('/:id', validateIdParam, carController.getCarById);
router.post('/', validateCarInput, carController.createCar);
router.put('/:id', validateIdParam, validateCarInput, carController.updateCar);
router.delete('/:id', validateIdParam, carController.deleteCar);

module.exports = router;