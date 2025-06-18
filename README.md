# DSO101 Final Project – DevSecOps Pipeline for PERN Stack BMI App

## Prerequisite

- Fork the repository [Link]( https://github.com/Darshansgit/DSO101_SE_project.git)
- Create a simple BMI Calculator which takes in user height and weight as an input and claculates the BMI.

    ![](image/1.png)

    ![](image/2.png)

- For the DB postgresql was used and validated the datas are saved as expected

    ![](image/4.png)

    ![](image/6.png)

- Write a test cases using jest amd vallidate that the calculator is functioning.

    ![](image/7.png)

    ![](image/3.png)

## Stage 1: Docker Configuration

- **Create a Databse Container with Persistent Data:**
    ```
    docker run --name=finals -e POSTGRES_PASSWORD=password -d -v postgres_data:/var/lib/postgresql/data postgres
    ```
    This command creates a new container called **finals** using official PostgreSQL image, setting up a volume named **postgres_data** to persist data in the `/var/lib/postgresql/data` directory. The **-d** flag runs the container in detached mode.

- **Connecting to the Database:**
    ```
    docker exec -ti finals psql -U postgres
    ```
    This command connects to the **finals** container and opens a psql shell as the **postgres** user. The **-ti** flag allows interaction with the container's terminal.

    ![](image/b.png)

- **Creating a Table Named tasks and Inserting Data Records**
    ```
    postgres=# CREATE TABLE bmi_records (
    id SERIAL PRIMARY KEY,
    name TEXT,
    height FLOAT,
    weight FLOAT,
    bmi FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
    This command creates a table named bmi_records with id, name, height, weight and bmi,then inserts a record into the table.

- **Verifying Data**

    ```
    SELECT * FROM bmi_records;
    ```
    This command retrieves all records from the bmi_records table but it was not able to retrieve

    ![](image/b1.png)

## Stage 2: Jenkins GitHub Push Automation

- **Steps:**
  - Installed Jenkins in local environment
  - Created pipeline named: `20030290_app_pipeline`
  - Configured job to trigger on `@push` commits
  - Added GitHub PAT credentials in Jenkins

    ![](image/8.png)

    ![](image/9.png)

    ![](image/10.png)

- **Pipeline Flow:**
  - Check commit message for `@push`
  - Run build & test steps
  - Push code to GitHub

## Stage 3: GitHub Actions Docker Build & Push

- **Steps:**
  - Created `.github/workflows/docker-build.yml`

    ```
    name: Docker Build and Push

    on:
    push:
        branches:
        - master

    jobs:
    build-and-push:
        runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and Push Backend (Dev)
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/bmi-backend-dev:latest -f backend/Dockerfile.dev backend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/bmi-backend-dev:latest

      - name: Build and Push Frontend (Dev)
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/bmi-frontend-dev:latest -f frontend/Dockerfile.dev frontend
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/bmi-frontend-dev:latest
    ```

  - Configured GitHub Secrets:
    - `DOCKERHUB_USERNAME`
    - `DOCKERHUB_TOKEN`

    ![](image/11.png)

  - Built and pushed Docker images for frontend and backend
  ![](image/14.png)

  ![](image/16.png)

  ![](image/17.png)

## Stage 4: Deploy to Render

- **Steps:**
  - Deployed backend and frontend using Docker images from Docker Hub
  - Used Render's managed PostgreSQL DB
  - Set environment variables on Render dashboard:
    - For backend:
      ```
      DB_URL=postgres://user:pass@db-host:5432/dbname
      ```
      ![](image/18.png)

      ![](image/19.png)

      ![](image/20.png)

    - For frontend:
      ```
      REACT_APP_API_URL=https://bmi-backend-dev-1.onrender.com
      ```

      ![](image/21.png)

      ![](image/22.png)
    
## Environment Variables

### `.env`

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=namgay
DATABASE_PASSWORD=password
DATABASE_NAME=finals
```

## Live Application:




