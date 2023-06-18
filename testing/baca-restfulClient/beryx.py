import requests
import base64
from PIL import Image
from io import BytesIO

headers = {
    'Authorization': 'Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleS1iZXJ5eC0wMDEiLCJ0eXAiOiJKV1QifQ.eyJyb2xlcyI6W10sImlzcyI6IlpvbmRheCIsImF1ZCI6WyJiZXJ5eCJdLCJleHAiOjE2ODc4OTg3NDUsImp0aSI6ImFrZmhzdWVoLGFsYmVydC5rZi5oc3VlaEBnbWFpbC5jb20ifQ.4RmS_Q2er8GNmbL9iT8PFl81XVJcmgUfJ_kzVpREZTbILmPz1D6G-mn40iT_0HviwSoIg4h9qMvKSxSfbiIaEg',
    'Accept': 'application/json'}
r = requests.get("https://api.zondax.ch/fil/data/v1/mainnet/tipset/latest", headers=headers)
beryx = r.json()
print(f"{r}: {beryx}")
currentheight = beryx['height']
print(currentheight)

headers = {'Accept': 'application/json'}
r = requests.get(f"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={currentheight}", headers=headers)
qrbytes = r.content
base64str = base64.b64encode(qrbytes).decode()
print(f"{r}, {base64str}")


img = Image.open(BytesIO(base64.b64decode(base64str)))
img.save("qrcode.png")
print(img.size)