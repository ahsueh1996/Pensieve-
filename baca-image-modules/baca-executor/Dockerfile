FROM python:3.11.2
ADD main.py .
ADD /inputs inputs
ADD /outputs outputs
RUN pip install pillow numpy matplotlib opencv-python-headless && pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

