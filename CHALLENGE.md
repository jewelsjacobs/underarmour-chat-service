# Project Description
For this project, we’d like you to build a simple chat service to manage messages. 
The service should be built using node.js and provide an api to satisfy the following features:

1.	Ability to create a new message for a **specified username**. An expiration time **can** be given to expire the message.
1.	Ability to return a list of **non-expired messages** for a **specified** username. A user should NOT be able to see messages that have expired.
1.	Data persistence. Restarting the service should not loose data.

Your implementation will likely include two endpoints: one for creating a message and one for retrieving messages.

| Name | Type | Description | Required |
| :---- |:-------------:| :-----:| -----:|
| username | String | The recipient of the message | Y |
| text | String  | The content of the message | Y |
| timeout | String | The number of seconds the message should live before expiring | N |

## Grading Criteria
- The code should be correct and satisfy the above requirements.
- Your storage solution fits well with the provided requirements.
- Endpoints use RESTful API design best practices, including: [URI design](REST.md), response status codes and error handling.
- Project includes clear, maintainable tests.
- Code is easy to read, maintainable and efficient.
## Bonus Points
- Implement the service to be horizontally scalable.
- Implement the service so that a recipient's messages are deleted upon retrieval.
- Document your API – either in a readme or using a documentation generator like Swagger.
- Use the new ES6 syntax and functionality.
