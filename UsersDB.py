import sqlite3

class UsersDB:
    def __init__(self, db):
        self.__db = db
        self.__cur =db.cursor()

    def addUser(self,  name, email, hpsw):
        try:
            print(f'name = {name}, email = {email}, pas = {hpsw}')
            self.__cur.execute(f'SELECT COUNT() as `count` FROM users WHERE email LIKE {email}')
            print('here!')
            res = self.__cur.fetchone()
            print(f'res={res}')
            if res['count']>0:
                print('Already have this user')
                return False
            self.__cur.execute("INSERT INTO users VALUES(NULL, ?, ?, ?, 0)", (name, email, hpsw))
            self.__db.commit()
        except sqlite3.Error as e:
            print('Error for add to database', str(e))
            return False
        return True

    def getUser(self, user_id):
        try:
            self.__cur.execute(f'SELECT * FROM users WHERE id = {user_id} LIMIT 1')
            res = self.__cur.fetchone()
            if not res:
                print('Cannot find such user')
                return False
            return res
        except sqlite3.Error as e:
            print('Error for get user from database'+ str(e))
        return False
    def getUserByEmail(self, email):
        try:
            self.__cur.execute(f'SELECT * FROM users WHERE email = {email} LIMIT 1')
            res =self.__cur.fetchone()
            print(res)
            if not res:
                print('Cannot get data from DB')
                return False
            return res
        except sqlite3.Error as e:
            print('Error for get user from database'+ str(e))
        return False
    def addUserScore(self,  id, score):
        try:
            self.__cur.execute(f'SELECT score FROM users WHERE id = {id}')
            res =self.__cur.fetchone()
            if score>res[0]:
                self.__cur.execute(f'UPDATE users SET score={score} WHERE id={id}')
                self.__db.commit()
        except sqlite3.Error as e:
            print('Error for add to database', str(e))
            return False
        return True
    def loadRecords(self):
        try:
            self.__cur.execute(f'SELECT name, score FROM users ORDER BY score DESC LIMIT 0,3')
            res = self.__cur.fetchall()
            # print('From DB:', *res[0])
            return res
        except sqlite3.Error as e:
            print('Error', str(e))
            return False
