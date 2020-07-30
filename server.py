from flask import Flask, redirect, render_template, url_for, flash, request,session
# from psycopg2 import errors
from forms import RegistrationForm, LoginForm
from data_manager import add_new_user, is_user_exist
import registration
from flask_login import current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '3cCF66xASeTv8feXuYZNtQ'


@app.route('/')
def main():
    return render_template('home.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_data = {
            'username': form.username.data,
            'email': form.email.data,
            'password': registration.hash_password(form.password.data),
        }
        add_new_user(user_data)
        flash(f'Account created for {form.username.data}! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = is_user_exist(form.username.data)
        if form.username.data in user['username'] and registration.verify_password(form.password.data, user['password']):
            session['username'] = form.username.data
            flash(f'Logged in as a {form.username.data}')
            return redirect(url_for('main'))
        flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('main'))


if __name__ == '__main__':
    app.run(debug=True,
            port=7000)
