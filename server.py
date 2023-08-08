import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, url_for, request, g, flash, session, redirect, abort
import sqlite3 as sq
import os
from UsersDB import UsersDB
from flask_login import  LoginManager, login_user, login_required, logout_user, current_user
from UserLogin import UserLogin

#configurations:
DATABASE = '/tmp/users.db'
DEBUG= True
SECRET_KEY = 'dsfdnjsnjdsjjdn43438nnwj834n'

app=Flask(__name__, template_folder="public_sq")
app.config.from_object(__name__)

app.config.update(dict(DATABASE=os.path.join(app.root_path, 'users.db')))

login_manager= LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    print('load user')
    return UserLogin().fromDB(user_id, dbase)

def connect_db():
    conn =sqlite3.connect(app.config['DATABASE'])
    conn.row_factory =sqlite3.Row
    return conn
#
def create_db():
    db=connect_db()
    with app.open_resource('createDB.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    db.close()

def get_db():
    if not hasattr(g, 'link_db'):
        g.link_db = connect_db()
    return g.link_db
#
dbase =None
@app.before_request
def before_request():
    global dbase
    db=get_db()
    dbase=UsersDB(db)

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'link_db'):
        g.link_db.close()

menu = [{"name":"Главная", "url": "login" }, {"name":"Рекорды", "url": "records" }, {"name":"Авторизация", "url": "login" }]



@app.route("/",methods=['GET', 'POST'] )
@login_required
def index():
    # return redirect(url_for('login'))
    return render_template('index_sq.html', menu=menu)

@app.route("/reg", methods=['GET', 'POST'])
def register():
    if request.method =='POST':
        if len(request.form['userName'])>2 and len(request.form['userEmail'])>2 and len(request.form['password'])>2 and request.form['password']==request.form['password2']:
            print('success')
           # hash = generate_password_hash(request.form['password'])
            hash = request.form['password']
            res = dbase.addUser(request.form['userName'], request.form['userEmail'], hash)
            print('res = ', res)
            if res:
                flash('yes', 'success')
                return redirect(url_for('login'))
            else:
                flash('no', 'error')
    return render_template('registration_sq.html', title ='Регистрация', menu=menu)

@app.route("/login", methods=["POST", "GET"] )
def login():

    if request.method =='POST':
        user = dbase.getUserByEmail(request.form['userEmail'])
        # if user and check_password_hash(user['password'], request.form['password']):
        if user and (user['password']==request.form['password']):
            userlogin = UserLogin().create(user)
            login_user(userlogin)
            return redirect(url_for('index'))
        flash('incorrect pair log/pas ', 'error')
#
    return render_template('login_sq.html', title ='Авторизация', menu=menu)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You exit your profile', 'success')
    return redirect(url_for('login'))

@app.route('/updateScore', methods=['POST', 'GET'])
@login_required
def updateScore():
    print(current_user.get_id())
    print('YES')
    if request.method == 'POST':
        print(request.json['score'])
        res = dbase.addUserScore(current_user.get_id(), request.json['score'])
        if res:
            flash('Сохранение прошло успешно!', 'success')
        else:
            flash('Ошибка сохранения!', 'error')
    return render_template('index_sq.html', menu=menu)

@app.route('/records', methods =['POST', 'GET'])
def records():
    res = dbase.loadRecords()
    top=[]
    for el in res:
        top.append({'name':el[0], 'score':el[1]})
    print(top)
    return render_template('records_sq.html', menu=menu, top=top)


if __name__ == "__main__":
    app.run(debug=True)

