﻿# AMA | Ask me Anything

---

This application combines Go (Golang) for the backend and React for the frontend. Users can create rooms  and share them with their community members. Within these rooms, users can submit questions, react to existing questions, and engage in real-time discussions. The application uses WebSockets to provide immediate updates on new questions and reactions. Questions are sorted based on likes, ensuring that popular questions rise to the top. Community owners and moderators can manage the space, addressing any issues that arise.


### Informations

- **Title**: AMA | Ask me Anything
- **Version**: v1.0 
- **Host**: localhost:8080

### Prerequisites 

Before getting started, make sure you have the  following prerequisites installed on your system:

- [Go](https://golang.org/dl/): The Go programming language
- [Docker](https://www.docker.com/get-started): Docker is required if you wish to run the application in a container.

### Installation  

Follow the steps below to install  the project in your development environment: 

1.  **Clone the repository:**
    ```
    git clone https://github.com/jhonatasgr/go-react.git
    ```
   
2.  **Open server directory:**
    ```
    cd server
    ```
3.  **Build the application using Docker Compose:**
    ```
    docker compose up
    ```
    or 
    ```
    docker compose start
    ```
4.  **Download dependencies::**
    ```
    go mod tidy
    ```
5.  **Create a Environment File:**
    
    - In the /server and /web directory, there is a file called `.env.example`. 
    - Duplicate the `.env.example` file and rename the copy to `.env`.
    - Fill in the actual values for your environment variables in the `.env` file.
    - Make sure to keep this file private and never commit it to version control (add `.env` to your .`gitignore`)
   .
  
  
5. **Running the application:**
    ```
    go run cmd/agr/main.go 
    ```

   - this application will accessible at `http://localhost:8080`

6. **Open Front-End folder:**
    ```
    cd..
    cd web
    ```
7. **Download dependencies:**
   
   use the -f or --force flag, to force the installation of dependencies that require react <=18.3.1, as the application uses some react 20 functionality that at the time of this              publication is experimental.
   
    ```
    npm install -f
    ```
9. **Running the front-end:r:**
    ```
    npm run dev
    ```
    - this application will accessible at `http://localhost:5031`

---

___

 
   
