import os
import argparse
import io
import requests
import base64
import json
from PIL import Image
import torch
import numpy as np
import torchvision
import PIL

OUTPUT_FOLDER = "outputs"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

TEST_IMG_FILE = os.path.join(OUTPUT_FOLDER,"test.png")

print(f"*********** Pensive Generic Executor ***********")
for lib in [np, torch, torchvision, PIL, json, base64, io, requests, argparse]:
  print(f"{lib.__name__}=={lib.__version__}")
imarray = np.random.rand(100,100,3) * 255
im = Image.fromarray(imarray.astype('uint8')).convert('RGBA')
im.save(TEST_IMG_FILE)
print(f"Complete.")