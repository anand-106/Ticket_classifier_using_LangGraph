from pydantic import BaseModel,Field


class Ticket(BaseModel):
    ticket_no: int
    message: str
    team: str
    summary: str
    technical_analysis : str
    priority: str
    suggested_approach: str
    additional_notes: str
    time: str
    isOpen: bool

class Message(BaseModel):
    message: str

class CloseTicket(BaseModel):
    isOpen: bool