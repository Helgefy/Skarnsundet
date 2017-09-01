import os
from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine, Column, Integer, Numeric, String , func
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base




app = Flask(__name__)
if(os.environ.get('DATABASE_URL') != None):
	connectURI = os.environ.get('DATABASE_URL')
else:
	connectURI = 'postgresql://helge:123qwe@localhost/SKARN_DB'
engine = create_engine(connectURI)
app.debug = True
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()
listOfAlbum = []

def main():
	global listOfAlbum
	listOfAlbum = session.query(bilder.album, func.count(bilder.album)).group_by(bilder.album).all()

def getBilder(albums,album):
	ut = {}
	return session.query(bilder.bilde_navn,bilder.fil_navn,bilder.beskrivelse).filter(bilder.album == album).all()
	for albumet in albums:
		ut[albumet[0]] = os.listdir('static/Album/' + albumet[0])
	return ut[album]




@app.route('/')
def home():
	return render_template('home.html')

@app.route('/album')
def album():
	return render_template('album.html')

@app.route('/getAlb', methods=['GET'])
def getAlb():
	return jsonify(listOfAlbum)

@app.route('/getBilder/<album>', methods=['GET'])
def getBild(album):
	albListe=[]
	for albumet in listOfAlbum:
		albListe.append(albumet[0])
	if(album in albListe):
		bilder = getBilder(listOfAlbum,album)
		return jsonify({'bilder': bilder, 'album': album})
	else:
		return jsonify({'bilder': getBilder(listOfAlbum,listOfAlbum[0][0]), 'album': listOfAlbum[0][0]})


class bilder(Base):
	__tablename__ = 'bilder'
	bilde_id = Column(Integer(),primary_key=True)
	bilde_navn = Column(String(20))
	fil_navn = Column(String(20))
	album = Column(String(20))
	beskrivelse = Column(String(160))

main()
