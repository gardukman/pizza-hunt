const router = require('express').Router();
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller');

// /api/pizzas GET all and POST
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// /api/pizzas/:id GET one, PUT, and DELETE 
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;
