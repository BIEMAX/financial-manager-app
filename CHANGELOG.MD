## [1.2.5 - Preview]

- Fixed 'Progress spinner - Disable other components during his visibility #119'
- Fixed 'Create a generic show notification #123'
- Fixed 'Progress spinner not centered at screen (all windows) #122'
- Fixed 'After logout, password field still have the old value #125'
- Run 'tests in case of exception/error in all forms #121'
- Fixed 'Bill update at home screen not reloading pending bills #97'
- Implemented defaulters manager #108
- Fixed 'Wrong date in release notes of v1.2.4 #128'
- Fixed 'Release notes with wrong title #130'
- Implemented 'New bill - Implement creation as stepper instead tabs #132'
- Implemented 'When change month by step in bills list, run query #126'
- Fixed 'Release notes versions - Put all versions in a dropdown list #133'
- Fixed 'Enhance the menu colors at home screen'
- Update the actions in list (bills, tags and defaulters)
- Implemented 'User update - Change to stepper actions instead tabs #135'
- Implemented 'User Dark theme #142'

## [1.2.4]

- Fixed users can't access submenu 'tags' in 'financial manager'
- Fixed an issue that prevents user query tags in mobile devices
- Fixed user sessions expired but never show errors
- Update - Home screen always show icons instead text and icon for menu

## [1.2.3]

- Implemented pagination in bills list
- Implemented sort data in bills list by header
- Enable edit and delete button on mobile devices
- Implemented tags manager (creation, update and delete)
- Change button 'save' color on new forms opening
- Implement screen resize for charts
- Improved error messages with solution and simplified

## [1.2.2]

- Resolved the issue of not being able to set overdue bills as paid
- Fixed 'keep user signed in' button not working properly
- Solved the problem of displaying the same accounts in the 'accounts due' and 'accounts overdue' panels
- Solved the issue of showing 'receipts' on overdue bills
- Added a separate menu for 'accounts past due' and 'accounts due' on the home screen


## [1.2.1]

- Fixed footer and header location
- Added support for mobile devices (all screens)
- Added log saving for all errors/exceptions throw during sessions
- Added screen to user creation
- Added on home screen, 'bills close to overdue' and 'bills already overdue'
- Fixed 'keep me connected' function not working on any device

## [1.2.0]

- Added function to register new account
- Added release notes screen
- Added function to update user information (like password, mail and name)
- Added charts and filter
- Added logs for every single error not catch
- Added bills not payed at started screen
- 

## [1.1.5]

- Fixed a number of issues related to updating accounts in the database
- Fixed an issue where it was not possible to locate an existing account
- Fixed an issue when trying to delete old accounts
- Developed report on monthly costs
- Developed report on annual costs
- Developed report on money received X costs X remaining money
- Developed report on the rest of the money each month

## [1.1.3]

- Implemented automated deploys (front-end and back-end)
- Implemented the monthly expense report
- Adjusted error messages and warnings
- Fixed a number of issues related to the usability of the interface
- Fixed a number of issues related to responsiveness
- Fixed issues with viewing pages on mobile devices

## [1.1.1]

- Fixed the problem on the homepage being duplicating components
- Fixed the issue of not saving created/selected tags in new accounts
- Fixed the issue of not being able to change tags in account editing
- Adjusted most error messages to be interpreted
- Solved the problem of sending empty account data

## [1.1.0]

- Implemented JWT authentication on login
- Implemented auto deploys in new versions
- Adjusted date formatting
- Added validation in order to avoid adding the same tag when creating a new invoice
- It is possible to access pages without logging in
- Clicking the homepage button returns you to the login page
- Account search is sending a month previous to current
- Unable to search accounts without a date selected
- When logging in, an error and success message is displayed

## [1.0.0]

- First version of financial manager
- Created a new sample app using java microservices
- Creation of bills
- Query bills