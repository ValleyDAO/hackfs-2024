import os
import ipfshttpclient
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import AddIPFS


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"ValleyDAO": "IPFS"}


def get_ipfs(cid: str):
    """
    Fetch the IPFS object given a CID. Only Store Json objects.
    """
    try:
        client = ipfshttpclient.connect(os.getenv("IPFS_GATEWAY_ENDPOINT"))
        return client.get(cid)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Item not found")


@app.post("/ipfs")
def post_ipfs(data: AddIPFS):
    """
    Post the IPFS object given a CID. Only Store Json objects.
    """
    try:
        # check if ipfs_cid is in the data
        existing_cid = data.ipfs_cid
        if existing_cid:
            existing_data = get_ipfs(existing_cid)
        else:
            existing_data = []
        
        existing_data.extend(data)

        # save the data to ipfs
        client = ipfshttpclient.connect(os.getenv("IPFS_GATEWAY_ENDPOINT"))
        return client.add_json(existing_data)
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")


@app.get("/ipfs/{cid}")
def read_ipfs(cid: str):
    """
    Fetch the IPFS object given a CID. Only Store Json objects.
    """
    try:

