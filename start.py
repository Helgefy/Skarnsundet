import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.debug = True
listOfAlbum = os.listdir('static/Album')


	


def getBilder(albums):
	ut = {}
	for album in albums:
		ut[album] = os.listdir('static/Album/' + album)
	return ut

bildeListe = getBilder(listOfAlbum)


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
	if(album in listOfAlbum):
		return jsonify({'bilder': bildeListe[album], 'album': album})
	else:
		return jsonify({'bilder': bildeListe[listOfAlbum[0]], 'album': listOfAlbum[0]})


if __name__ == '__main__':
	main()