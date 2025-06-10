from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
import requests
from dotenv import load_dotenv
import os

load_dotenv()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv('API_AUDIENCE')
ALGORITHMS = [os.getenv('ALGORITHMS')]
NAMESPACE = os.getenv('NAMESPACE')
auth_scheme = HTTPBearer()


def token_verify(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):

    token = credentials.credentials

    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    jwks = requests.get(jwks_url).json()

    unverified_token = jwt.get_unverified_header(token)
    print(unverified_token)  

    rsa_key = next(
        (
            {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }
            for key in jwks["keys"]
            if key["kid"] == unverified_token["kid"]
        ),
        None,
    )

    if rsa_key is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    

    try:
        payload= jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f'https://{AUTH0_DOMAIN}/'
        )
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail="token validation failed")
    
def check_role(allowed_roles: list[str]):
    def role_checker(payload=Depends(token_verify)):
        roles = payload.get(f"{NAMESPACE}/roles", [])
        if not any(role in roles for role in allowed_roles):
            raise HTTPException(status_code=403, detail="Role Not authorized")
        return payload
    return role_checker



