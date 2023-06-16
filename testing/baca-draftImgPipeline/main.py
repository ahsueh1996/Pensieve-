import numpy
from PIL import Image
import os
import argparse
from io import BytesIO
import base64

parser = argparse.ArgumentParser(description='Personal information')
parser.add_argument('--v', dest='v', type=str, help='tell me your variant',default="unknown")
parser.add_argument('--i', dest='i', type=str, help='image in base64',default="unknown")
args = parser.parse_args()
v = args.v
imb64 = args.i

im = Image.open(BytesIO(base64.b64decode(imb64)))

savepath = "outputs"
os.makedirs(savepath, exist_ok=True)
savefile = os.path.join(savepath,"received.png")
im.save(savefile)



print(f"You have successfully saved an image by calling from {v}! Saved to {savefile}")