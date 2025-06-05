from datetime import datetime
import pytz

def individual_serial(ticket)->dict:
    return {
        "id": str(ticket["_id"]),
        "message": ticket["message"],
        "team": ticket["team"],
        "summary": ticket["summary"],
        "technical_analysis" : ticket["technical_analysis"],
        "priority": ticket["priority"],
        "suggested_approach": ticket["suggested_approach"],
        "additional_notes": ticket["additional_notes"],
        "time": ticket["time"],
        "isOpen": ticket["isOpen"]
    }

def list_serial(tickets):
    return [individual_serial(ticket) for ticket in tickets]

def make_ticket(ticket):

    ist = pytz.timezone('Asia/Kolkata')
    now = datetime.now(ist)
    formatted_now = now.strftime('%Y-%m-%d %H:%M:%S')

    return {
        "ticket_no": 1000,
        "message": ticket["message"],
        "team": ticket["team"],
        "summary": ticket["summary"],
        "technical_analysis" : ticket["technical_analysis"],
        "priority": ticket["priority"],
        "suggested_approach": ticket["suggested_approach"],
        "additional_notes": ticket["additional_notes"],
        "time": str(formatted_now),
        "isOpen": True
    }