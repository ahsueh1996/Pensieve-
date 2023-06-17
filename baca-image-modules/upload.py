import os
import argparse
from io import BytesIO
import base64
import json
from PIL import Image, ImageDraw, ImageFilter
import torch
import torchvision.transforms as T
from torchvision import models
import numpy as np
import cv2
import random

OUTPUT_FOLDER = "outputs"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

METADATA_FILE = os.path.join(OUTPUT_FOLDER,"metadata.json")

PROC_IMG_FILE = os.path.join(OUTPUT_FOLDER,"processed.png")
SEG_IMG_FILE = os.path.join(OUTPUT_FOLDER,"segmentation.png")
ORG_IMG_FILE = os.path.join(OUTPUT_FOLDER,"original.png")

print(f"*********** Pensive Image Upload Preprocessing Module ***********")
parser = argparse.ArgumentParser(description='Pensieve Image Upload Preprocessing Module')
parser.add_argument('--i', dest='i', type=str, help='image in base64 (max dimensions est. 400x400)',default=None)
parser.add_argument('--m', dest='m', type=str, help='metadata of image, json format',default="{}")
args = parser.parse_args()
imgb64 = args.i
metadata = json.loads(args.m)

if (imgb64 == None):
    img = Image.open("inputs/sample.jpg")
else:
    img = Image.open(BytesIO(base64.b64decode(imgb64)))

orgimg = img.copy()


# We will automatically segment instances of the image and tag each result
fcn = models.segmentation.fcn_resnet101(pretrained=False, pretrained_backbone=False).eval()
fcnckpt = torch.load('inputs/fcn_resnet101_coco-7ecb50ca.pth')
fcn.load_state_dict(fcnckpt, strict=False)
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
  label_names = ["background",
                 "airplane", "bike", "bird", "boat", "bottle",
                 "bus", "car", "cat", "chair", "cow",
                 "table", "dog", "horse", "motorbike", "person",
                 "plant", "sheep", "sofa", "train", "monitor"]
  r = np.zeros_like(image).astype(np.uint8)
  g = np.zeros_like(image).astype(np.uint8)
  b = np.zeros_like(image).astype(np.uint8)
  
  items = []
  for l in range(0, nc):
    idx = image == l
    r[idx] = label_colors[l, 0]
    g[idx] = label_colors[l, 1]
    b[idx] = label_colors[l, 2]
    if (np.any(idx)):
       items.append(label_names[l])
    
  rgb = np.stack([r, g, b], axis=2)
  return rgb, items


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
  rgb, items = decode_segmap(om)
  #if show_pic: plt.imshow(rgb); plt.axis('off'); plt.show()
  return rgb, items


npsegimg, items = segment(fcn, img, dev='cpu')

segimg = Image.fromarray(np.uint8(npsegimg))

npimg = np.array(img)

grayimg = cv2.cvtColor(npimg, cv2.COLOR_BGR2GRAY)
haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
faces_rect = haar_cascade.detectMultiScale(grayimg, scaleFactor=1.1, minNeighbors=9)
print(faces_rect)

mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
apefiles = os.listdir("inputs/apes")
apes = []
for (x, y, w, h) in faces_rect:
    cv2.rectangle(npimg, (x, y), (x+w, y+h), (0, 255, 0), thickness=2)
    draw.rectangle([ (x,y), (x+w,y+h) ], fill=255)
    apefile = "choose randome ape"
    while (".png" not in apefile):
      apefile = random.choice(apefiles)
    print(f"chosen ape {apefile} for face @ {(x,y,w,h)}")
    apeimg = Image.open(os.path.join('inputs','apes',apefile))
    background = Image.new('RGBA', apeimg.size, (255,255,255))
    alpha_composite = Image.alpha_composite(background, apeimg)
    apeimg = alpha_composite.convert('RGB')
    apeimg.thumbnail((w,h))
    apes.append((apeimg,x,y,w,h,apefile))

blurred = img.filter(ImageFilter.GaussianBlur(30))
img.paste(blurred, mask=mask)

# from matplotlib import pyplot as plt
for ape in apes:
  apeimg = ape[0]
  x = ape[1]
  y = ape[2]
  w = ape[3]
  h = ape[4]

  npapeimg = np.array(apeimg)

  mask = np.zeros(npapeimg.shape[:2], np.uint8)
  backgroundModel = np.zeros((1, 65), np.float64)
  foregroundModel = np.zeros((1, 65), np.float64)
  rectangle = (w//6, h//6, w-w//6, h-h//6)
  cv2.grabCut(npapeimg, mask, rectangle,  
              backgroundModel, foregroundModel,
              5, cv2.GC_INIT_WITH_RECT)
  mask2 = np.where((mask == 2)|(mask == 0), 0, 1).astype('uint8')
  image = npapeimg * mask2[:, :, np.newaxis]
  # plt.imshow(mask2)
  # plt.colorbar()
  # plt.show()
  mask2 = Image.fromarray(np.uint8(mask2*255))
  img.paste(apeimg, (x,y), mask=mask2)



img.save(PROC_IMG_FILE)
segimg.save(SEG_IMG_FILE)
orgimg.save(ORG_IMG_FILE)

aperooturl='ipfs://bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi/'
metadata = {"objects":items,
            "faces": len(faces_rect),
            "apes": [aperooturl+ape[-1].split('.')[0] for ape in apes]}

with open(METADATA_FILE,"w") as f:
  json.dump(metadata, f)


print(f"Complete.")