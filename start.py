import os
from flask import Flask, render_template

app = Flask(__name__)
app.debug = True

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/album')
def album():
	return render_template('album.html')