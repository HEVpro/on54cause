# How to use Akave 
These are the instructions to use Akave (key features for our project):

## Setup
A VPS has been set to run the Docker image ([here](https://github.com/akave-ai/akavelink)), it is running on the IP address and the port provided through our internal WhatsApp group.

Add to the .env file the following:

AKAVE_HOST="provided-ip"
AKAVE_PORT="provided-port"
    
## Key endpoints
    
The most important endpoints for the project are:

**List avatars**
curl -X GET AKAVE_HOST:AKAVE_PORT/buckets/avatars/files

**Upload file**
curl -X POST AKAVE_HOST:AKAVE_PORT/buckets/avatars/files -F file=@/path/to/file.jpg

**Download file**
curl -X GET AKAVE_HOST:AKAVE_PORT/avatars/files/file.jpg/download -o file.jpg

More information: [here](https://hackathon-docs.akave.ai/js-docker-example-code#bucket-operations)