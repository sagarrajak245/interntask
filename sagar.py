# sagar's  solutions

# 1. Weather Data Aggregation
def aggregate_weather_data(records):
    c_data = {}
    
    for record in records:
        city = record['name']
        if city not in c_data:
            c_data[city] = {'temp_sum': 0, 'temp_count': 0, 'humid_sum': 0, 'humid_count': 0}
        
        if 'temperature' in record:
            c_data[city]['temp_sum'] += record['temperature']
            c_data[city]['temp_count'] += 1
        
        if 'humidity' in record:
            c_data[city]['humid_sum'] += record['humidity']
            c_data[city]['humid_count'] += 1
    
    results = {}
    for city, data in c_data.items():
        
        #check if temp_count is greater than 0 then calculate avg temp
        
        
        results[city] = {
            'avg_temperature': data['temp_sum'] / data['temp_count'] if data['temp_count'] > 0 else None,
            'avg_humidity': data['humid_sum'] / data['humid_count'] if data['humid_count'] > 0 else None
        }
    
    return results












# 2. Prime Factorization
def prime_factorization(n):
    factors = [] 
    divisor = 2 # start with 2
    while n > 1:     # loop until n is greater than 1
        exp = 0      # initialize exponent
        while n % divisor == 0:   # check if n is divisible by divisor
            exp += 1 # increment exponent
            n //= divisor # divide n by divisor to get new n
        if exp > 0:
            factors.append((divisor, exp)) # append to factors list
        divisor += 1
        if divisor * divisor > n:  # if divisor is greater than square root of n
                                   # to make this process fast we can write ourr own square root fun using binary search 
            if n > 1:             
                factors.append((n, 1))
            break
    return factors



# to call main function
if __name__ == "__main__":
    # Test weather data aggregation
    wrecords = [
        {'name': 'mumbai', 'temperature': 30, 'humidity': 40},
        {'name': 'nashik', 'temperature': 28},
        {'name': 'pune', 'humidity': 56},
        {'name': 'delhi', 'temperature': 40, 'humidity': 35}
    ]
    
    
    
    # call for aggregation function
    print(f"Here is your ans botsheryasi: {aggregate_weather_data(wrecords)}") 

    # call for  factorization
    print(f'\nHere is your ans botshreyasi: {prime_factorization(100)}') 