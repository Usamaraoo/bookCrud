import sqlite3

conn = sqlite3.connect('book.sqlite')

cursor = conn.cursor()
sql_query = """ CREATE TABLE BOOK (
id integer PRIMARY KEY,
title text NOT NULL,
cover text NOT NULL,
category text NOT NULL,
cost text NOT NULL
) """

cursor.execute(sql_query)