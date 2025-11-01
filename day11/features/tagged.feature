@smoke
Feature: Tagged Feature

  @login
  Scenario: Login Test
    Given I launch the browser
    When I open the login page
    Then I should see the dashboard
