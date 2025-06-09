from datetime import datetime
import pytz
from Database.config.database import collection_name

def individual_serial(ticket)->dict:
    return {
        "id": str(ticket["_id"]),
        "ticket_no": ticket["ticket_no"],
        "message": ticket["message"],
        "team": ticket["team"],
        "summary": ticket["summary"],
        "technical_analysis" : ticket["technical_analysis"],
        "priority": ticket["priority"],
        "suggested_approach": ticket["suggested_approach"],
        "additional_notes": ticket["additional_notes"],
        "time": ticket["time"],
        "isOpen": ticket["isOpen"],
        "user_id":ticket["user_id"]
    }

def list_serial(tickets):
    return [individual_serial(ticket) for ticket in tickets]

def make_ticket(ticket):

    ist = pytz.timezone('Asia/Kolkata')
    now = datetime.now(ist)
    formatted_now = now.strftime('%Y-%m-%d %H:%M:%S')

    return {
        "ticket_no": 1001+collection_name.count_documents({}),
        "message": ticket["message"],
        "team": ticket["team"],
        "summary": ticket["summary"],
        "technical_analysis" : ticket["technical_analysis"],
        "priority": ticket["priority"],
        "suggested_approach": ticket["suggested_approach"],
        "additional_notes": ticket["additional_notes"],
        "time": str(formatted_now),
        "isOpen": True,
        "user_id":ticket["user_id"]
    }