from pydantic import BaseModel
from typing import Optional


class AddIPFS(BaseModel):
    data: dict
    ipfs_cid: Optional[str] = None
