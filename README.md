In the Fruitlist component, a collection of fruit items is stored as an array. Each fruit object in this array contains properties such as id, name, imgurl, and price. The fruit items are then mapped over using JavaScript’s map() function to display each fruit in the component. For each fruit, the FruitItem component is rendered, receiving the following props: fruit, onAddFruit, and onRemoveFruit.

Managing the Cart in Fruitlist
The handleAddFruit function is used to manage the items in the cart. It updates the addedFruit state by adding or incrementing the quantity of the selected fruit. To ensure the state is updated properly, React treats the state as immutable, which means we can't directly modify the state array. Instead, we create a temporary variable called updatedFruits, where we check if the fruit is already in the cart using its id. If the fruit exists, we simply increment its quantity and update its total price accordingly. If the fruit is not already in the cart, we add it with a quantity of 1 and calculate the total price. The updated list of fruits is then stored in the addedFruit state using the setAddedFruit setter function.

Similarly, the handleRemoveFruit function allows us to remove a fruit from the cart. It works in a similar way to handleAddFruit, but instead of incrementing the quantity, it decrements it. If the quantity reaches 1, the item is removed from the cart.

The Cart Component
The Cart component receives several props from the Fruitlist component: addedFruit, totalPrice, and handleRemoveFruit. These props are used to display the fruit items in the cart, show the total price, and allow the user to remove an item from the cart. The addedFruit prop contains the list of fruits added to the cart, along with the quantity and total price for each item. The handleRemoveFruit function is passed as a prop, so it can be used within the Cart component to remove items when necessary.

Order Tracking and Payment
Once the user is ready to proceed with the order, they can click the "Buy Now" button, which reveals a payment section. The handleSubmit function is triggered when the user submits the payment form. It generates a random tracking ID for the order, sends the payment details to the backend via a POST request, and alerts the user about the successful booking.



