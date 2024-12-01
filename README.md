# chatbot-webapp
Due to lack of time and issues with deployment, you can follow the steps to set up locally.

##  1. Set Up Environment Variables
Navigate to the `backend/` directory and create a .env file. Add the following variables with appropriate values:
```
SECRET_KEY='???'  # Generate your own Django secret key after setting up the project.
GEMINI_API_KEY='???'  # Set your own Gemini API key here.
MYSQL_ROOT_PASSWORD='???'  # Set the root password for MySQL.
MYSQL_USER='???'  # Set your MySQL username here.
MYSQL_PASSWORD='???'  # Set the password for the MySQL user.
DJANGO_DB_USER='???'  # Set your Django database user here.
DJANGO_DB_PASSWORD='???'  # Set the password for the Django database user.
```

## 2: Generate Django Secret Key
After setting up the project, you can generate a secret key for Django by running in the shell `python3 manage.py shell`:

```
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```
Copy the generated key and set it as the value for SECRET_KEY in the .env file.

## 3. Docker-compose
Make sure you have docker-compose installed. Once your .env file is set up, it's time to set up the containers. You can run `docker-compose up --build -d`. This will start the services for Django, MySQL and Angular.

## 4. Run Migrations and Create superuser
After setting up the containers, execute the following commands to apply database migrations.
Open a terminal session inside the `django-backend` container:
```
docker exec -it django-backend bash
```
Run the migrations after:
```
python3 manage.py migrate
```
To create a superuser (admin user) for accessing the Django admin panel, run:
```
python3 manage.py createsuperuser
```
Follow the prompts to create

## 5. Access the Application
Backend Admin
Once the migrations are applied and the admin user is created, you can access the Django admin interface at `http://0.0.0.0:8000/admin`.
The frontend application can be accessed at `http://0.0.0.0:4200/`.


## 6. Set up Gemini Key
To enable Gemini integration, set up your own Gemini API key and add it to your .env file under the `GEMINI_API_KEY` variable.
Once done, the backend will be able to interact with the Gemini API using your provided key.

This should cover the basic setup for running your application


