from fastapi import APIRouter,Depends
from Database.models.model import Ticket,Message,CloseTicket
from Database.schema.schemas import list_serial,make_ticket,individual_serial
from Database.config.database import collection_name
from ticket_agent import run_chatbot
from bson import ObjectId
from pydantic import ValidationError
from fastapi import HTTPException
from Auth.auth import check_role

router = APIRouter()


#getRequest
@router.get("/tickets")
async def get_tickets(payload=Depends(check_role(['admin','Developers']))):
    tickets = list_serial(collection_name.find())
    return tickets

#post
@router.post("/add-ticket")
async def set_ticket(message: Message,payload=Depends(check_role(['user','admin','Developers']))):
    print("setting ticket")
    try:
        ticket = run_chatbot(message.message,user_id=payload["sub"])
        final_ticket=make_ticket(ticket)
        print(payload)
        collection_name.insert_one(Ticket(**final_ticket).model_dump(mode="alias"))
        return final_ticket
    except ValidationError as e:
        print(e)

#get single ticket
@router.get("/ticket/{ticketNo}")
async def get_ticket(ticketNo:int,payload=Depends(check_role(['user','admin','Developers']))):
    ticket = collection_name.find_one({"ticket_no":ticketNo})
    if ticket:
        return individual_serial(ticket)
    else:
        raise HTTPException(status_code=404, detail="Ticket not found")
    

#close Ticket
@router.patch("/ticket/{ticketNo}",)
async def close_ticket(ticketNo: int ,data: CloseTicket,payload=Depends(check_role(['admin','Developers']))):
    collection_name.update_one({"ticket_no":ticketNo},{"$set":{"isOpen":data.isOpen}})
    return {"message":"Ticket closed successfully"}


#get tickets by user id
@router.get("/my-tickets")
async def get_my_tickets(payload=Depends(check_role(['user', 'admin', 'Developers']))):
    print(payload)
    user_id = payload["sub"]
    tickets = list_serial(collection_name.find({"user_id": user_id}))
    return tickets
    