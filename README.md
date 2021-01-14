# league-of-btk

Hi there, we have a small tennis community (for fun) and goal to make league system.

This is the backend side of the league (in progress). Developed with TypeScript, MongoDB, GraphQL API. Jest is used for tests. React will be used for frontend, and try to deploy aws.

League Properties and Rules:

Member:
* <sub>has a default standing which is organized by coaches (for first time),</sub>
* <sub>must challenge 2 people in a month.</sub>
* <sub>can challenge only better players on standing (up by max 3). For example, if I am 17th in the league, then I can challenge 16th, 15th and 14th player.</sub>

Match:
* <sub>match is bo3 and 4 game set.</sub>
* <sub>set is finished by 5 - 3, 4 - (less than 3), or tiebreaker (7).</sub>
* <sub>if match is 2-2 on sets, last set is a tiebreaker set (10).</sub>

