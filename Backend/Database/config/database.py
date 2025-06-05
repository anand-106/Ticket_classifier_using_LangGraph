
from pymongo.mongo_client import MongoClient



client = MongoClient("mongodb+srv://admin:mongo123@cluster0.sw5zopi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.tickets

collection_name= db["ticket_collection"]