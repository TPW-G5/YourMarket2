#!/bin/bash
pip3 install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py loaddata fixture.json
python3 manage.py runserver