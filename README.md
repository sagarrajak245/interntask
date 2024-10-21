# Weather Data and Prime Factorization Assignment

This project contains Python functions for weather data aggregation and prime factorization, along with a SQL query for updating product prices.

## Setup and Running

1. Ensure you have Python 3.x installed on your system.

2. Clone this repository or download the script file.

3. Open a terminal and navigate to the project directory.

4. Run the script using Python:
   ```
   python sagar.py
   ```

5. The script will demonstrate example usage of the functions.

## Functions

### 1. aggregate_weather_data(records)

This function takes a list of weather records and returns aggregated data for each city.

Input: List of dictionaries, each containing 'name' (city name) and optionally 'temperature' and 'humidity'.
Output: Dictionary with city names as keys and average temperature and humidity as values.

### 2. prime_factorization(n)

This function performs prime factorization of a given integer.

Input: An integer.
Output: List of tuples, each containing a prime factor and its exponent.

## 3. SQL Query

The SQL query to increase product prices by 10% and display the results is provided in the script as a comment.

To use the SQL query:
1. Connect to your database.
2. Run the UPDATE statement to increase prices.
3. Run the SELECT statement to view the updated prices.


## Method 1: Using Common Table Expression (CTE)



The following SQL code demonstrates how to use a CTE to update the prices of products:

```sql
-- Method 1
-- Here I made a common table expression to update the price of all products
-- by multiplying the price by 1.10 (10% increase) and then used the UPDATE.
-- It is a good way to do it since you can update the price of any table
-- Also, it gives you the freedom to do any kind of calculation on the price.

WITH updated_prices AS (
    SELECT id, name, price * 1.10 AS new_price
    FROM products
)
UPDATE products
SET price = updated_prices.new_price
FROM updated_prices
WHERE products.id = updated_prices.id;

SELECT name, price AS new_price
FROM products;
```

## Explanation
- The CTE named `updated_prices` calculates the new prices by multiplying the current price by 1.10.
- The `UPDATE` statement then sets the price of each product to the new price derived from the CTE.
- Finally, a `SELECT` statement retrieves the product names along with their updated prices.



## Method 2: Direct Update
The following SQL code demonstrates how to directly update the prices of products using DML Commands:

```sql
-- Method 2
-- Here I directly updated the price of all products by multiplying the price
-- by 1.10 (10% increase) and then used the SELECT statement to display the
-- product names and new prices.

UPDATE products
SET price = price * 1.10;

SELECT name AS product_name, price AS new_price
FROM products;
````


## Explanation
- The `UPDATE` statement multiplies the current price of each product by 1.10 to apply the 10% increase.
- A `SELECT` statement is then used to retrieve the product names along with their updated prices.

## Conclusion
This method provides a straightforward approach to updating product prices directly in the database.



## Notes

- The weather data aggregation function handles missing data gracefully.
- The prime factorization function works efficiently for moderately sized numbers.
- Modify the example usage in the `__main__` section to test with your own data.

