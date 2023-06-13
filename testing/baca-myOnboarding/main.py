import numpy
from PIL import Image
import os
import argparse

parser = argparse.ArgumentParser(description='Personal information')
parser.add_argument('--v', dest='v', type=str, help='tell me your variant',default="unknown")
args = parser.parse_args()
v = args.v

imarray = numpy.random.rand(100,100,3) * 255
im = Image.fromarray(imarray.astype('uint8')).convert('RGBA')

savepath = "outputs"
os.makedirs(savepath, exist_ok=True)
savefile = os.path.join(savepath,"result_image.png")
im.save(savefile)



print(f"You have successfully printed an image by calling from {v}! Saved to {savefile}")