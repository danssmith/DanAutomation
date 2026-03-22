Feature: Leave Search
    As an OrangeHRM User
    I want to navigate to the Leave webpage
    So that I can set leave date ranges and search for scheduled leave

Scenario: User can search for Leave Records
    Given the User has successfully logged into OrangeHRM
    And the User navigates to the Leave page
    When the User sets a date range
    And the User clicks search
    Then the search results should be displayed

Scenario: No Records Found when searching for Leave
    Given the User has successfully logged into OrangeHRM
    When the User navigates to the Leave page
    Then "No Records Found" will be displayed to the User