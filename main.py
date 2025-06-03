from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from ticket_agent import run_chatbot
import uvicorn

app = FastAPI()

Tickets= []


class Message(BaseModel):
    message: str


class Ticket(BaseModel):
    team: str
    message: str
    summary: str
    technical_analysis: str
    priority_level: str
    suggested_approach:str
    additional_notes: str


@app.post("/ticket/add-ticket")
def add_ticket(message: Message):
    result = run_chatbot(message.message)
    Tickets.append(result)
    return result

@app.get("/tickets")
def get_tickets():
    return Tickets

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)


