Feature: Cucumber
  Scenario: Check Corde's version
    When I run `yarn corde -v` 
<<<<<<< HEAD
    Then the output should contain "v2.0.0-beta.4"
    And the exit status should be 0
=======
    Then the output should contain "v2.0.0-beta.10"
    And the exit status should be 0
>>>>>>> master
