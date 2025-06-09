from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from ticket_agent import run_chatbot
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from Database.routes.route import router
from Auth.auth import token_verify
from fastapi import FastAPI, Depends

app = FastAPI()


app.include_router(router)







app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or use ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@router.get("/protected")
def admin_only_route(user=Depends(token_verify)):
    return {"message": "welcome you are Authenticated", "user": user}




# @app.post("/ticket/add-ticket")
# def add_ticket(message: Message):
#     result = run_chatbot(message.message)
#     Tickets.append(result)
#     return result

# @app.get("/tickets")
# def get_tickets():
#     print("GET /tickets called")
#     return {"tickets":Tickets}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)


