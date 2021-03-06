# censorText_jobTest

## 3 different ways to provide the "censored words list" to the application
* Environment variables 
  * This would be better than having the list hardcoded into the actual application, however it is still somewhat a manual process. The list could be updated without needing a new release to take place for the actual application, as they would be separate. However, this would still mean the list is stored locally. 

* Database - direct access
  * Using a technology such as SQL, statements can be made within the application, it would be possible to request the words list for use within the application, this would be an improvement on having the list hardcoded within the application. It would save space if the list grew enormously, requests to a database are very fast and would mean that the application's core code would not need to be altered to update the list.
  * However, a database requires management and also licenses can cost a lot of money. In addition, accessing the "censor words list" would still be coupled with the application, as there would be statements within the code.

* REST API
  * The main advantage of using an API here, would be the decoupling between the application and the code. This could involve the server responding with JSON data, which could then be incorporated into the application, requiring little knowledge of how the data is being stored or formatted on the server side. Also, because of the standard way to retrieve the data, very little maintenance would be required for this connection. This would make the application itself easier to maintain, as any changes/upgrades to the application should not affect the way data is retrieved. 
