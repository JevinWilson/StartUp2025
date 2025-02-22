import tornado.ioloop
import tornado.web
import os

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("signUp.html")

class MergeHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("merge.html")

def make_app():
    settings = {
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "debug": True
    }
    
    return tornado.web.Application(
        [
            (r"/", MainHandler),
            (r"/merge", MergeHandler),
            (r"/static/(.*)", tornado.web.StaticFileHandler, {"path": settings['static_path']}),
        ],
        **settings
    )

if __name__ == "__main__":
    app = make_app()
    app.listen(8000)
    print("Server is running on http://localhost:8000")
    tornado.ioloop.IOLoop.current().start()

#to do 
    # 1. add multiple profiles for swiping demonstration
    # 2. add images
    # 3. add LinkedIn button that redirects to LinkedIn profile