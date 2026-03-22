Feature: Login
  As an OrangeHRM user
  I want to provide valid login credentials
  So that I can login to my account

Scenario: Successful login with valid credentials
    Given the User is on the OrangeHRM login page
    When the User enters valid credentials
    Then the User should see the dashboard

Scenario: Failed login with invalid username
    Given the User is on the OrangeHRM login page
    When the User enters an invalid username and valid password
    Then the User should see an error message
    And the error message should display the wording: "Invalid credentials"

Scenario: Failed login with invalid password
    Given the User is on the OrangeHRM login page
    When the User enters a valid username and invalid password
    Then the User should see an error message
    And the error message should display the wording: "Invalid credentials"

Scenario: Failed login with invalid username and password
    Given the User is on the OrangeHRM login page
    When the User enters an invalid username and invalid password
    Then the User should see an error message
    And the error message should display the wording: "Invalid credentials"

Scenario: Failed login with empty username and empty password
    Given the User is on the OrangeHRM login page
    When the User attempts to login without providing any credentials
    Then the User should see "Required" under the username field
    And the User should see "Required" under the password field

  Scenario: Failed login with empty username and valid password
    Given the User is on the OrangeHRM login page
    When the User attempts to login with an empty username and valid password
    Then the User should see "Required" under the username field

  Scenario: Failed login with valid username and empty password
    Given the User is on the OrangeHRM login page
    When the User attempts to login with a valid username and empty password
    Then the User should see "Required" under the password field