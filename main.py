from flask import Flask, render_template, request

app = Flask('app')

@app.route('/')
def hello_world():
  return render_template('Main.html')

if __name__ == "__main__":
  app.run(host='0.0.0.0', port=3000)