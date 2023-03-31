from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('book.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn


@app.route('/books', methods=['GET', 'POST'])
def index():
    conn = db_connection()
    cursor = conn.cursor()
    if request.method == 'GET':
        cursor = cursor.execute("SELECT  * FROM BOOK")
        book = [
            dict(id=row[0], title=row[1], cover=row[2],
                 category=row[3], cost=row[4])
            for row in cursor.fetchall()
        ]
        if book is not None:
            return jsonify(book)
    if request.method == 'POST':
        newTitle = request.json['title']
        newCover = request.json['cover']
        newCategory = request.json['category']
        newCost = request.json['cost']
        sql = """ INSERT INTO BOOK(title,cover,category,cost) VALUES (?,?,?,?)
           """
        cursor.execute(sql, (newTitle, newCover, newCategory, newCost))
        conn.commit()
        return f"Book with the idL:{cursor.lastrowid} created successfully", 201


@app.route('/books/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def detail_book(id):
    conn = db_connection()
    cursor = conn.cursor()
    if request.method == 'GET':
        cursor = cursor.execute(f"SELECT  *  FROM BOOK WHERE id={id}")
        book = cursor.fetchone()
        if book is not None:
            return jsonify({"id":book[0],"title":book[1],"cover":book[2],"category":book[3],"cost":book[4]})
        else:
            return "Somethin went wrong"
    if request.method == 'PUT':
        title = request.json['title']
        cover = request.json['cover']
        category = request.json['category']
        cost = request.json['cost']
        cursor = cursor.execute(f""" UPDATE BOOK SET
          title=?, cover=?, category=?, cost=?
              WHERE id=?""",(title,cover,category,cost,id))
        conn.commit()
        return jsonify({"title":title,"cover":cover,"category":category,"cost":cost})

if __name__ == "__main__":
    app.run(debug=True)
