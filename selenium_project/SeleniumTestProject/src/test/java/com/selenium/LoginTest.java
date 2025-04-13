package com.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginTest {

    WebDriver driver;

    @BeforeTest
    public void setup() {
        // Automatically manages the compatible ChromeDriver
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("file:///D:/sem6/sepm/codes/interntask/selenium_project/SeleniumTestProject/src/main/java/com/selenium/index.html");
    }

    @Test
    public void testLogin() {
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement loginButton = driver.findElement(By.id("login"));

        username.sendKeys("testuser");
        password.sendKeys("password123");
        loginButton.click();
    }

    @AfterTest
    public void tearDown() {
        driver.quit();
    }
}
