const prompt1 = (text) => `
Extract the important entities mentioned in the text below: 

"Consider all dietary restrictions, 
the maximum budget, 
and the amount of people eating."

Find a recipe for breakfast, lunch, and dinner. 
Add up all of the ingredient prices, call this order_total.
If the maximum_budget is available and order_total is greater than the maximum budget by more than 15, find different recipes for breakfast, lunch, and dinner.

Generate a named, bulleted list of all ingredients for each recipe 
according to the desired format below.

Add each recipe's link below its list.

If available, add the given maximum budget below the total.

If the maximum budget is available, subtract the total from it and add that below.

Finally, compile a grocery list of all previously listed ingredients at the end.

Please give a long answer using markdown syntax.

Desired format:
""" 
## Recipe: <recipe_name> - <amount_of_servings>
* <ingredient> <price_of_all_servings> (<price_per_serving> / serving)
Subtotal: <recipe_total_price>

[Link to Recipe](<link_to_recipe>)

## Recipe: <recipe_name> - <amount_of_servings>
* <ingredient> <price_of_all_servings> (<price_per_serving> / serving)
Subtotal: <recipe_total_price>

[Link to Recipe](<link_to_recipe>)

# Approximate Total: <order_total>

### Given Budget: <maximum_budget>

### <if (maximum_budget - order_total) > 0 then savings else additional_cost>

## Grocery List:
* <ingredient_name>
"""

Text: ${text}
`;

module.exports = { prompt1 };
