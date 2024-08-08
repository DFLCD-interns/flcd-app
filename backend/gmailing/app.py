from flask import Flask, render_template,request, jsonify
# from smtp import send_email, formatter
from flask_cors import CORS
import json
import gmailing

app = Flask(__name__)
CORS(app)

# cors = CORS(app, resources={r"/emailpie": {"origins": "http://localhost:port"}})

@app.get("/")
def hi():
    print("HIIIIIIIIIIIII")
    return "<p>Hi</p>"

@app.post("/mail")
def emailpie():
    response = jsonify({'success': 'true'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    rjson = request.get_json()
    print("rjson", rjson)
    subject = rjson["subject"]
    body = rjson["body"]
    recipient = rjson["recipient"]
    # print(request.form, subject, body, recipient)
    print("Sending to: ", recipient)
    gmailing.send_email(subject, body, str(recipient))
    return response


# @app.route("/",methods=["GET","POST"])
# def smtp_exl():
#     if request.method == 'POST':
#         print(request.form)
#         FROM = formatter(request.form.get('frm_name'),request.form.get('frm_email'))
#         res = send_email(
#                      request.form.get('smtp_svr'),
#                      request.form.get('smtp_svr_usrn'),
#                       request.form.get('smtp_svr_password'),
#                       FROM,
#                        request.form.get('to'),
#                        request.form.get('reply_to'),
#                        {
#                         "html":bool(int(request.form.get('html'))),
#                         "subject":request.form.get("subject"),
#                         "txt":request.form.get("txt"),
#                          },
#                          request.form.get('port'),
#                          )
#         return res

    
#     return render_template('index.html')


if __name__ == '__main__':
    app.run()