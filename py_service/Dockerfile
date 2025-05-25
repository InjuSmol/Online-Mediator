FROM python:3.10-slim

# Install system dependencies for building Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run the app
CMD ["python", "app.py"]


#FROM python:3.10

#WORKDIR /app
#COPY . .

#RUN pip install --no-cache-dir -r requirements.txt

#CMD ["python", "app.py"]
