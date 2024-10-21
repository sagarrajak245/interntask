# Weather Data and Prime Factorization Assignment

This project contains Python functions for weather data aggregation and prime factorization, along with a SQL query for updating product prices.

## Setup and Running

1. Ensure you have Python 3.x installed on your system.

2. Clone this repository or download the script file.

3. Open a terminal and navigate to the project directory.

4. Run the script using Python:
   ```
   python assignment_solutions.py
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

The SQL query to increase product prices by 10% and display the results is provided below.

To use the SQL query:
1. Connect to your database.
2. Run the following SQL statements:

```sql
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

or u can use 


```sql

UPDATE products
SET price = price * 1.10;
SELECT name As product_name, price AS new_price
FROM products;
```


3. Run the SELECT statement to view the updated prices.





## Notes

- The weather data aggregation function handles missing data gracefully.
- The prime factorization function works efficiently for moderately sized numbers.
- Modify the example usage in the `__main__` section to test with your own data.


