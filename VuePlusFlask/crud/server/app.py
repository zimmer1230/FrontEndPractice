from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
app.config.from_object(__name__)

def remove_book(book_id):
    for book in BOOKS:
        if book['id'] == book_id:
            BOOKS.remove(book)
            return True
    return False

def ret_book_by_id(book_id):
    for book in BOOKS:
        if book['id'] == book_id:
            return book
    return 'Book not found!'

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

BOOKS = [
    {
        'id': uuid.uuid4().hex,
        'title': 'On the Road',
        'author': 'Jack Kerouac',
        'read': True
    },
    {   'id': uuid.uuid4().hex,
        'title': 'Harry Potter and the Philosopher\'s Stone',
        'author': 'J. K. Rowling',
        'read': False
    },
    {
        'id': uuid.uuid4().hex,
        'title': 'Green Eggs and Ham',
        'author': 'Dr. Seuss',
        'read': True
    }
]

@app.route('/books', methods=['GET','POST'])
def all_books():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        BOOKS.append({
            'id': uuid.uuid4().hex,
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })        
        response_object['message'] = 'Book added!'
    else:
        response_object['books'] = BOOKS
    return jsonify(response_object)


@app.route('/books/<book_id>', methods=['PUT','GET','DELETE'])
def single_book(book_id):
    response_object = { 'status': 'success' }
    if request.method == 'PUT':
        post_data = request.get_json()
        remove_book(book_id)
        BOOKS.append({
            'id': uuid.uuid4().hex,
            'title': post_data.get('title'),
            'author': post_data.get('author'),
            'read': post_data.get('read')
        })
        response_object['message'] = 'Book updated.'
    if request.method == 'GET':
        return ret_book_by_id(book_id)
    if request.method == 'DELETE':
        remove_book(book_id)
        response_object['message'] = 'Book deleted.'
    return jsonify(response_object)

@app.route('/hello', methods=['GET'])
def hello():
    return jsonify('Hell word!')

if __name__ == '__main__':
    app.run()