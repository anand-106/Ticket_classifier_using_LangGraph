from dotenv import load_dotenv
import os
from pymongo.mongo_client import MongoClient

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client.tickets

collection_name= db["ticket_collection"]