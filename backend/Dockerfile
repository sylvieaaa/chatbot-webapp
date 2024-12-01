# Use Ubuntu as a parent image
FROM ubuntu:22.04

# Set environment variable to make sure the frontend does not ask for input
ENV DEBIAN_FRONTEND=noninteractive

# Set the working directory inside the container
WORKDIR /app

# Install necessary dependencies including Python and system libraries
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libmysqlclient-dev \
    libpq-dev \
    pkg-config \
    libssl-dev \
    curl \
    python3-distutils \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements.txt into the container
COPY requirements.txt /app/

# Install Python dependencies from requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY . /app/

# Expose port 8000 (for Django)
EXPOSE 8000

# CMD ["tail", "-f", "/dev/null"] 
# Set the command to run your app (adjust for your application entry point)
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]