import numpy
from PIL import Image
import os
import argparse
from io import BytesIO
import base64
import json
from PIL import Image
import torch
import torchvision.transforms as T
import numpy as np

OUTPUT_FOLDER = "outputs"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

PROC_IMG_FILE = os.path.join(OUTPUT_FOLDER,"processed.png")
ORG_IMG_FILE = os.path.join(OUTPUT_FOLDER,"original.png")

print(f"*********** Pensive Image Upload Preprocessing Module ***********")
parser = argparse.ArgumentParser(description='Pensieve Image Upload Preprocessing Module')
parser.add_argument('--i', dest='i', type=str, help='image in base64 (max dimensions est. 400x400)',default=None)
parser.add_argument('--m', dest='m', type=str, help='metadata of image, json format',default="{}")
args = parser.parse_args()
imb64 = args.i
metadata = json.loads(args.m)

if (imb64 == None):
    im = Image.open("inputs/sample.jpg")
else:
    im = Image.open(BytesIO(base64.b64decode(imb64)))


# We will automatically segment instances of the image and tag each result
from torchvision import models
fcn = models.segmentation.fcn_resnet101(pretrained=True).eval()
# fcnckpt = torch.load('models/fcn_resnet101_coco-7ecb50ca.pth')
# fcn.load_state_dict(fcnckpt, strict=False)
fcn = fcn.eval()
# dlab = models.segmentation.deeplabv3_resnet101(pretrained=False, pretrained_backbone = False)
# dlabckpt = torch.load('models/deeplabv3_resnet101_coco-586e9e4e.pth')
# dlab.load_state_dict(dlabckpt, strict=False)
# dlab = dlab.eval()


# Define the helper function
def decode_segmap(image, nc=21):
  
  label_colors = np.array([(0, 0, 0),  # 0=background
               # 1=aeroplane, 2=bicycle, 3=bird, 4=boat, 5=bottle
               (128, 0, 0), (0, 128, 0), (128, 128, 0), (0, 0, 128), (128, 0, 128),
               # 6=bus, 7=car, 8=cat, 9=chair, 10=cow
               (0, 128, 128), (128, 128, 128), (64, 0, 0), (192, 0, 0), (64, 128, 0),
               # 11=dining table, 12=dog, 13=horse, 14=motorbike, 15=person
               (192, 128, 0), (64, 0, 128), (192, 0, 128), (64, 128, 128), (192, 128, 128),
               # 16=potted plant, 17=sheep, 18=sofa, 19=train, 20=tv/monitor
               (0, 64, 0), (128, 64, 0), (0, 192, 0), (128, 192, 0), (0, 64, 128)])

  r = np.zeros_like(image).astype(np.uint8)
  g = np.zeros_like(image).astype(np.uint8)
  b = np.zeros_like(image).astype(np.uint8)
  
  for l in range(0, nc):
    idx = image == l
    r[idx] = label_colors[l, 0]
    g[idx] = label_colors[l, 1]
    b[idx] = label_colors[l, 2]
    
  rgb = np.stack([r, g, b], axis=2)
  return rgb


def segment(net, img, show_pic=False, dev='cuda'):
  #if show_pic: plt.imshow(img); plt.axis('off'); plt.show()
  # Comment the Resize and CenterCrop for better inference results
  trf = T.Compose([#T.Resize(640), 
                   #T.CenterCrop(224), 
                   T.ToTensor(), 
                   T.Normalize(mean = [0.485, 0.456, 0.406], 
                               std = [0.229, 0.224, 0.225])])
  inp = trf(img).unsqueeze(0).to(dev)
  out = net.to(dev)(inp)['out']
  om = torch.argmax(out.squeeze(), dim=0).detach().cpu().numpy()
  rgb = decode_segmap(om)
  #if show_pic: plt.imshow(rgb); plt.axis('off'); plt.show()
  return rgb


npimg = segment(fcn, im, dev='cpu')

im = Image.fromarray(np.uint8(npimg))

im.save(PROC_IMG_FILE)

print(f"Complete.")