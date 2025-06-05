from fastapi import APIRouter
from Database.models.model import Ticket,Message
from Database.schema.schemas import list_serial,make_ticket
from Database.config.database import collection_name
from ticket_agent import run_chatbot
from bson import ObjectId
from pydantic import ValidationError

router = APIRouter()


#getRequest
@router.get("/tickets")
async def get_tickets():
    tickets = list_serial(collection_name.find())
    return tickets

#post
@router.post("/add-ticket")
async def set_ticket(message: Message):
    print("setting ticket")
    try:
        ticket = run_chatbot(message.message)
        final_ticket=make_ticket(ticket)
        collection_name.insert_one(Ticket(**final_ticket).model_dump(mode="alias"))
        return final_ticket
    except ValidationError as e:
        print(e)

    