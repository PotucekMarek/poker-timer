from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
import time

options = Options()

service = Service(executable_path="./geckodriver.exe")
driver = webdriver.Firefox(service=service, options=options)

driver.get("http://localhost:5173/poker-timer/")
time.sleep(2)  

settings_button = driver.find_element(By.ID, "openForm")
settings_button.click()
time.sleep(1)


modal = driver.find_element(By.ID, "blindForm")

assert modal.get_attribute("class").find("show") != -1, "Modal form does not work"
print("Modal form work.")

add_round_btn = driver.find_element(By.ID, "addRoundBtn")
add_round_btn.click()
time.sleep(1)

delete_button = driver.find_element(By.CSS_SELECTOR, ".btn-outline-danger")
delete_button.click()
time.sleep(2)

rounds = driver.find_elements(By.CSS_SELECTOR, "#rounds-container .round-row")
assert len(rounds) > 0, "No round was added."
print(f"Počet kol: {len(rounds)}")


small_blind_input = driver.find_element(By.ID, "small2")
small_blind_input.clear()
small_blind_input.send_keys("999")

assert small_blind_input.get_attribute("value") == "999", "Small blind was not changed."
print("Small blind was changed.")

small_blind_input2 = driver.find_element(By.ID, "small3")
small_blind_input2.clear()
small_blind_input2.send_keys("1999")

assert small_blind_input2.get_attribute("value") == "1999", "Small blind was not changed."
print("Small blind was changed.")



time_for_all= driver.find_element(By.ID, "globalTimeInput")
time_for_all.clear
time_for_all.send_keys(0.1)
time.sleep(2)
global_time = driver.find_element(By.ID, "applyGlobalTimeBtn")
driver.execute_script("arguments[0].scrollIntoView(true);", global_time)
print("Use for all click.")
time.sleep(1)

global_time.click()

time_input = driver.find_element(By.ID, "time3")
driver.execute_script("arguments[0].scrollIntoView(true);", time_input)
time_input.clear()
time_input.send_keys("0.5")

save_button = driver.find_element(By.ID, "saveBlinds")
save_button.click()
print("Save button work.")

initial_blinds = driver.find_element(By.ID, "blinds-combined")
initial_blinds.text

button = driver.find_element(By.ID, "playPauseToggle")
button.click()
print("Click on play button.")

time.sleep(10)

new_blinds = driver.find_element(By.ID, "blinds-combined").text

assert initial_blinds != new_blinds, "Round did not  switch with continue round."
print("Round continue correctly.")

time.sleep(100)
driver.quit()
    