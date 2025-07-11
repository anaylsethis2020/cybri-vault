
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
import requests

app = FastAPI()

# ----------- Data Models -----------

class CVE(BaseModel):
    id: int
    name: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=10)

# ----------- In-Memory Database -----------

cve_db = []

# ----------- CRUD Endpoints -----------

@app.get("/cves")
def get_all_cves():
    return {"cves": cve_db}

@app.post("/cves")
def create_cve(cve: CVE):
    for item in cve_db:
        if item.id == cve.id:
            raise HTTPException(status_code=400, detail="CVE already exists")
    cve_db.append(cve)
    return {"message": "CVE added", "data": cve}

@app.put("/cves/{cve_id}")
def update_cve(cve_id: int, updated_cve: CVE):
    for i, item in enumerate(cve_db):
        if item.id == cve_id:
            cve_db[i] = updated_cve
            return {"message": "CVE updated", "data": updated_cve}
    raise HTTPException(status_code=404, detail="CVE not found")

@app.delete("/cves/{cve_id}")
def delete_cve(cve_id: int):
    for i, item in enumerate(cve_db):
        if item.id == cve_id:
            deleted = cve_db.pop(i)
            return {"message": "CVE deleted", "data": deleted}
    raise HTTPException(status_code=404, detail="CVE not found")

# ----------- External API - VirusTotal -----------

@app.get("/research_domain")
def research_domain(domain: str = Query(..., min_length=4)):
    try:
        api_key = "YOUR_API_KEY"
        headers = {"x-apikey": api_key}
        url = f"https://www.virustotal.com/api/v3/domains/{domain}"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=500, detail=str(e))
