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

payload_pymine = {
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

r = requests.post("http://dashboard.bacalhau.org:1000/api/v1/run", json=payload_pymine)

from multiformats_cid import make_cid, CIDv0
try:
  cidv0 = make_cid(r.json()["cid"])
  cidv1 = str(cidv0.to_v1())
  print(f"Status Code: {r.status_code}, cidv0: {cidv0}, cidv1: {cidv1}\n{r.json()}")
except:
  print(f"Status Code: {r.status_code}, {r.json()}")