# blog-api
Express/Node RESTful API that provides access to the MongoDB database used in the MERN stack blogging website at https://webrite.onrender.com/

React frontend repo can be found at https://github.com/clarencechaan/blog-frontend

Queries to the API can be made by sending the desired HTTP request to https://webrite-api.onrender.com/<query>

| Method |           Endpoint          |               Description               | Required fields                           | JSON Web Token (JWT) <br>required  |
|:------:|:---------------------------:|:---------------------------------------:|-------------------------------------------|:----------------------------------:|
| GET    | /api/posts                  | Retrieve all posts                      |                     -                     |                  ❌                 |
| POST   | /api/posts                  | Create a post                           |      title, body, published, img_url      |                  ✅                 |
| GET    | /api/posts/published        | Retrieve all published posts            |                     -                     |                  ❌                 |
| GET    | /api/posts/published/latest | Retrieve 4 latest published posts       |                     -                     |                  ❌                 |
| GET    | /api/posts/:postId          | Retrieve specified post                 |                     -                     |                  ❌                 |
| DELETE | /api/posts/:postId          | Delete specified post                   |                     -                     |                  ✅                 |
| GET    | /api/posts/:postId/comments | Retrieve all comments on specified post |                     -                     |                  ❌                 |
| POST   | /api/posts/:postId/comments | Create a comment on specified post      |                 name, text                |                  ❌                 |
| POST   | /api/users                  | Create a user                           | first_name, last_name, username, password |                  ❌                 |
| GET    | /api/me                     | Retrieve user associated with JWT       |                     -                     |                  ✅                 |
| POST   | /auth/login                 | Retrieve JWT associated with user       |             username, password            |                  ❌                 |

Post model: { author, title, body, published, published_date, img_url }

Comment model: { name, text, post, timestamp }

User model: { first_name, last_name, username, password }
