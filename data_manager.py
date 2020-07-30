from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import connection


@connection.connection_handler
def add_new_user(cursor: RealDictCursor, user_data):
    query = sql.SQL('''INSERT INTO users (username, email, password) VALUES ( {username}, {email}, {password});''')\
        .format(username=sql.Literal(user_data['username']),
                email=sql.Literal(user_data['email']),
                password=sql.Literal(user_data['password']))
    cursor.execute(query)


@connection.connection_handler
def is_user_exist(cursor: RealDictCursor, username):
    query = sql.SQL('SELECT * FROM users WHERE username={username};').format(username=sql.Literal(username))
    cursor.execute(query)
    return cursor.fetchone()


