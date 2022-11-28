from flask import Flask, render_template, request, redirect, Response, url_for, session, abort, g, flash

app = Flask(__name__)



@app.route("/")
@app.route("/home")
def home():
        return render_template('index.html')

@app.route('/england/', methods=["GET","POST"])
def england():

        return render_template("england.html")


@app.route('/wales/', methods=['GET', 'POST'])
def wales():

        return render_template("wales.html")

@app.route('/WHW/', methods=['GET', 'POST'])
def WHW():

        return render_template("WHW.html")

@app.route('/munros/', methods=['GET', 'POST'])
def munros():

        return render_template("munros.html")


@app.route('/admin/', methods=['GET', 'POST'])
def admin():

        return render_template("admin/adminLogin.html")


@app.route('/createpost/', methods=['GET', 'POST'])
def createpost():

        return render_template("admin/createPost.html")

@app.route('/adminDashboard/', methods=['GET', 'POST'])
def adminDashboard():

        return render_template("admin/adminDashboard.html")
        

if __name__ == "__main__":
      app.run('localhost', 5000, debug=True)