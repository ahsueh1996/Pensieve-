FROM python:3.11.2
ADD main.py .
ADD /inputs inputs
ADD /outputs outputs
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt