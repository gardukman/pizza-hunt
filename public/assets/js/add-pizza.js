// calls from the add-topping input from add-pizza.html
const $addToppingBtn = document.querySelector('#add-topping');
// calls from the pizza-form input from add-pizza.html
const $pizzaForm = document.querySelector('#pizza-form');
// calls from the custom-toppings-list input from add-pizza.html
const $customToppingsList = document.querySelector('#custom-toppings-list');

const handleAddTopping = event => {
  event.preventDefault();

  // text input for new-toppings on add-pizza.html
  const toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handlePizzaSubmit = event => {
  event.preventDefault();

  // text inputs for pizza-name, created-by and pizza-size on add-pizza.html
  const pizzaName = $pizzaForm.querySelector('#pizza-name').value;
  const createdBy = $pizzaForm.querySelector('#created-by').value;
  const size = $pizzaForm.querySelector('#pizza-size').value;
  const toppings = [...$pizzaForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!pizzaName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { pizzaName, createdBy, size, toppings };

  // function to POST form data object to the API
  fetch('/api/pizzas', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(postResponse => {
    alert('Pizza created successfully!');
    console.log(postResponse);
  })
  .catch(err => {
    console.log(err);
  });
};

$pizzaForm.addEventListener('submit', handlePizzaSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
