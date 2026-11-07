from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


def main():
    project_root = Path(__file__).resolve().parent
    handler = partial(NoCacheHandler, directory=str(project_root))

    with ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        url = "http://127.0.0.1:{}/".format(server.server_address[1])
        print("Serving the current portfolio files from:", project_root, flush=True)
        print("Opening:", url, flush=True)
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPortfolio server stopped.")


if __name__ == "__main__":
    main()
