# league-of-btk

Hi there, we are a small tennis community (for fun) and planning to make league system.

This is the backend side of the league (in progress). Developed with TypeScript, MongoDB, GraphQL API. Jest is used for tests. React will be used for frontend, and try to deploy aws.

League Properties and Rules:

Member:
* has a default standing which is organized by coaches (for first time),
* must challenge 2 people in a month.
* can challenge only better players on standing (up by max 3). For example, if I am 17th in the league, then I can challenge 16th, 15th and 14th player.

  Match:
    * match is bo3 and 4 game set.
    * set is finished by 5 - 3, 4 - (less than 3), or tiebreaker (7).
    * if match is 2-2 on sets, last set is a tiebreaker set (10).
    
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Laravel](https://laravel.com)
    
