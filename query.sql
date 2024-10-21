
-- 3.Data Manipulation Challenge:
-- Scenario: A table named products contains columns id, name, and price.
-- Task: Write a SQL query to increase the price of all products by 10% and 
-- display the new prices along with the product names.


-- as per the scenario, we have to increase the price of all products by 10% 
--and display the new prices along with the product names.
-- we can achieve this by using the UPDATE statement to update the 
--price of all products by multiplying the price by 1.10 (10% increase) and
-- then use the SELECT statement to display the product names and new prices.





--method 1
-- here i made a common table expression to update the price of all products
-- by multiplying the price by 1.10 (10% increase) and then used the UPDATE
--it is good way to do i feel since u can update the price of all any table
--also it gives u freedom to  do any kind of calculation on the price
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



--method 2
-- here i directly updated the price of all products by multiplying the price
-- by 1.10 (10% increase) and then used the SELECT statement to display the
-- product names and new prices.


UPDATE products
SET price = price * 1.10;
SELECT name As product_name, price AS new_price
FROM products;
