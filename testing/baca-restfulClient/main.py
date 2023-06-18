import pprint

from bacalhau_sdk.api import submit
from bacalhau_sdk.config import get_client_id
from bacalhau_apiclient.models.publisher import Publisher
from bacalhau_apiclient.models.storage_spec import StorageSpec
from bacalhau_apiclient.models.spec import Spec
from bacalhau_apiclient.models.job_spec_language import JobSpecLanguage
from bacalhau_apiclient.models.job_spec_docker import JobSpecDocker
# from bacalhau_apiclient.models.job_sharding_config import JobShardingConfig
# from bacalhau_apiclient.models.job_execution_plan import JobExecutionPlan
from bacalhau_apiclient.models.deal import Deal


data = dict(
    APIVersion='V1beta1',
    ClientID=get_client_id(),
    spec=dict(
        engine="Docker",
        verifier="Noop",
        publisher={"Type":"Ipfs"},
        docker=dict(
            image="ubuntu",
            entrypoint=["sleep", "15"],
        ),
        deal=dict(concurrency=3, confidence=0, min_bids=0),
        inputs=[          
          dict(
            storagesource="ipfs",
            cid="QmWG3ZCXTbdMUh6GWq2Pb1n7MMNxPQFa9NMswdZXuVKFUX",
            path="/datasets",
          )
        ],
    ),
)

# job = submit(data)
# pprint.pprint(job)
# from bacalhau_sdk.api import results

# print(results(job_id=job.metadata.id))

import requests
payload_ubuntu_hello = {
  "Engine": "Docker", 
  "Docker": {"Image": "ubuntu", "Entrypoint": ["echo", "hello"]}, 
  "Deal": {"Concurrency": 1}, 
  "Verifier": "Noop", 
  "PublisherSpec": {"Type":"IPFS"}, 
  "random":{"mystuff":123}
  }

payload_pytut = {
  "Engine": "Docker", 
  "Docker": {"Image": "akfhsueh/baca-pytut", "Entrypoint": ["python", "similar-movies.py"]}, 
  "Deal": {"Concurrency": 1}, 
  "Verifier": "Noop", 
  "PublisherSpec": {"Type":"IPFS"}, 
  "random":{"mystuff":123}
  }

payload_pyonboarding = {
  "Deal": {"Concurrency": 1}, 
  "Docker": {"Image": "akfhsueh/baca-myonboarding4", "Entrypoint": ["python", "main.py", "--v", "rest"]}, 
  "Engine": "Docker", 
  "Language": {"JobContext": {}},
  "Network": {"Type": None},
  "Publisher": "Estuary", 
  "PublisherSpec": {"Type":"Estuary"},
  "Resources": {"GPU": ""},
  "Timeout": 1800,
  "Verifier": "Noop",
  "Wasm": {"EntryModule": {}},
  "outputs":[{"Name":"outputs","StorageSource":"IPFS","path":"/outputs"}]
  }

imb64 = "R0lGODlhDwAPAKECAAAAzMzM/////wAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw=="

import base64
from PIL import Image

image = Image.open('input2.jpg')
image.thumbnail((400, 400))
image.save('input_thumbnail.jpg')
with open("input_thumbnail.jpg", "rb") as img_file:
  imb64 = base64.b64encode(img_file.read()).decode('utf-8').replace('\n','')
  print(imb64[0:200])
  f = open("imb64","w")
  f.write(imb64)
  f.close()

# import ipfsapi

# def ipfsFileFunction(filename):
#     api = ipfsapi.connect('127.0.0.1', 5001)
#     ipfsLoadedFile = api.add(filename)
#     ipfsHash = (ipfsLoadedFile['Hash'])
#     return ipfsHash

# ipfsHash = ipfsFileFunction("imb64")
# print(f"My ipfs Hash: {ipfsHash}")
# if (len(imb64)>130314):
#    imb64="ipfs"

payload_pyimgpipe = {
  "Deal": {"Concurrency": 1}, 
  "Docker": {"Image": "akfhsueh/baca-dftimgpipe", "Entrypoint": ["python", "main.py", "--v", "rest", "--i", imb64]}, 
  "Engine": "Docker", 
  "Language": {"JobContext": {}},
  "Network": {"Type": None},
  "Publisher": "Estuary", 
  "PublisherSpec": {"Type":"Estuary"},
  "Resources": {"GPU": ""},
  "Timeout": 1800,
  "Verifier": "Noop",
  "Wasm": {"EntryModule": {}},
  # "inputs":[{"CID":ipfsHash,"StorageSource":"IPFS","path":"/inputs"}],
  "outputs":[{"Name":"outputs","StorageSource":"IPFS","path":"/outputs"}]
  }

payload_pyoldpreproc = {
  "Deal": {"Concurrency": 1}, 
  "Docker": {"Image": "akfhsueh/baca-upload-preproc2", "Entrypoint": ["python", "main.py", "--i", imb64]}, 
  "Engine": "Docker", 
  "Language": {"JobContext": {}},
  "Network": {"Type": None},
  "Publisher": "Estuary", 
  "PublisherSpec": {"Type":"Estuary"},
  "Resources": {"GPU": ""},
  "Timeout": 1800,
  "Verifier": "Noop",
  "Wasm": {"EntryModule": {}},
  # "inputs":[{"CID":ipfsHash,"StorageSource":"IPFS","path":"/inputs"}],
  "outputs":[{"Name":"outputs","StorageSource":"IPFS","path":"/outputs"}]
  }


'''
Corresponding cli run
bacalhau docker run --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload.py --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg --input ipfs://QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU:/inputs/fcn_resnet101_coco-7ecb50ca.pth --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png:/inputs/apes akfhsueh/baca-generic-pytorch-cpu-cv2headless-plt -- python3 /inputs/upload.py --i $(cat ~/Documents/Github/Pensieve-/testing/baca-restfulClient/imb64)
bacalhau docker run --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload-qr.py --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg --input ipfs://QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU:/inputs/fcn_resnet101_coco-7ecb50ca.pth --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png:/inputs/apes --input https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png:/inputs/apes akfhsueh/baca-generic-pytorch-cpu-cv2headless-plt -- python3 /inputs/upload-qr.py --i $(cat ~/Documents/Github/Pensieve-/testing/baca-restfulClient/imb64)
'''

payload_pyupload = {
  "Deal": {"Concurrency": 1}, 
  "Docker": {"Image": "akfhsueh/baca-generic-pytorch-cpu-cv2headless-plt", "Entrypoint": ["python3", "/inputs/upload.py","--i",imb64]}, 
  "Engine": "Docker", 
  "Language": {"JobContext": {}},
  "Network": {"Type": None},
  "Publisher": "Estuary", 
  "PublisherSpec": {"Type":"Estuary"},
  "Resources": {"GPU": ""},
  "Timeout": 1800,
  "Verifier": "Noop",
  "Wasm": {"EntryModule": {}},
  "inputs":[
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload.py",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/upload.py",
      "path": "/inputs"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/sample.jpg",
      "path": "/inputs/apes"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/0.png",
      "path": "/inputs/apes"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1.png",
      "path": "/inputs/apes"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1000.png",
      "path": "/inputs/apes"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1002.png",
      "path": "/inputs/apes"},
    {"Name": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png",
      "StorageSource": "URLDownload",
      "URL": "https://raw.githubusercontent.com/ahsueh1996/Pensieve-/main/baca-image-modules/inputs/apes/1003.png",
      "path": "/inputs/apes"},
    {"CID": "QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU",
      "Name": "ipfs://QmRfzrnEEr3smFntyrz27xh2Xy1mmL2b4VAh3U3K7uhTBU",
      "StorageSource": "IPFS",
      "path": "/inputs/fcn_resnet101_coco-7ecb50ca.pth"}
  ],
  "outputs":[{"Name":"outputs","StorageSource":"IPFS","path":"/outputs"}]
  }

r = requests.post("http://dashboard.bacalhau.org:1000/api/v1/run", json=payload_pyupload)

from multiformats_cid import make_cid, CIDv0
try:
  cidv0 = make_cid(r.json()["cid"])
  cidv1 = str(cidv0.to_v1())
  print(f"Status Code: {r.status_code}, cidv0: {cidv0}, cidv1: {cidv1}\n{r.json()}")
except:
  print(f"Status Code: {r.status_code}, {r.json()}")



