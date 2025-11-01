Feature: Login Functionality

  Scenario: Verify user login
    Given I launch the browser
    When I open the login page
    And I enter valid credentials
    Then I should see the dashboard
