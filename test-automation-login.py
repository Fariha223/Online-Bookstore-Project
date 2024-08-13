from selenium import webdriver
from selenium.webdriver.common.by import By

#have issues with the .click() function for this page
#form fillup using send.keys() works fine.

chrome_options = webdriver.ChromeOptions()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(options=chrome_options)

try:
    driver.get("http://localhost:3000/login")

    email_field = driver.find_element(By.CSS_SELECTOR, value='input[type="email"]')

    password_field = driver.find_element(By.CSS_SELECTOR, value='input[type="password"]')
    login_button = driver.find_element(By.CLASS_NAME, value='log-Button')

    email_field.send_keys("your_username")
    password_field.send_keys("your_password")
    login_button.click()


    driver.get("http://localhost:3000/dashboard")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    driver.quit()