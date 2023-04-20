from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app,cors_allowed_origins="*")
import mysql.connector

def db_connection():
    conn = None
    try:
        conn = mysql.connector.connect(
            host="",
            user="",
            password="",
            database=""
        )
    except mysql.connector.Error as e:
        print(e)
    return conn


@app.route('/books', methods=['GET', 'POST'])
def index():
    conn = db_connection()
    cursor = conn.cursor()
    try:
        if request.method == 'GET':
            cursor.execute("SELECT * FROM book")
            book = [
                dict(id=row[0], title=row[1], cover=row[2],
                     category=row[3], cost=row[4])
                for row in cursor.fetchall()
            ]
            if book is not None:
                return jsonify(book), 200
   
        if request.method == 'POST':
            
            content = request.json
           
            newTitle = content['title']
            newCover = content['cover']
            newCategory = content['category']
            newCost = content['cost']
            sql = """ INSERT INTO book(title,cover,category,cost) VALUES (%s,%s,%s,%s)"""
            cursor.execute(sql, (newTitle, newCover, newCategory, newCost))
            conn.commit()
            return f"Book with the id:{cursor.lastrowid} created successfully", 201
    except Exception as e:
        print(e)
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/books/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def detail_book(id):
    conn = db_connection()
    cursor = conn.cursor()
    if request.method == 'GET':
        try:
            cursor.execute("SELECT * FROM book WHERE id=%s", (id,))
            book = cursor.fetchone()
            if book is not None:
                return jsonify({"id":book[0],"title":book[1],"cover":book[2],"category":book[3],"cost":book[4]})
            else:
                return "Book not found", 404
        except mysql.connector.Error as error:
            return f"Failed to get book: {error}", 500

    if request.method == 'PUT':
        try:
            title = request.json['title']
            cover = request.json['cover']
            category = request.json['category']
            cost = request.json['cost']
            cursor.execute("UPDATE book SET title=%s, cover=%s, category=%s, cost=%s WHERE id=%s", (title, cover, category, cost, id))
            conn.commit()
            return jsonify({"title":title,"cover":cover,"category":category,"cost":cost})
        except mysql.connector.Error as error:
            return f"Failed to update book: {error}", 500

    if request.method == 'DELETE':
        try:
            cursor.execute("DELETE FROM book WHERE id=%s", (id,))
            conn.commit()
            return "Book deleted", 204
        except mysql.connector.Error as error:
            return f"Failed to delete book: {error}", 500

if __name__ == "__main__":
    app.run(debug=True)
