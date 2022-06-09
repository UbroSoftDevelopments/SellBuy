from http import server
from numpy import product
import simplejson
from http.server import HTTPServer,BaseHTTPRequestHandler
import re
from os.path import exists

class echoHandler(BaseHTTPRequestHandler):

    def readWriteFile(self,filename,dataToAdd):
        file_exists = exists(filename)
        data = simplejson.loads(dataToAdd)
        if file_exists == False:
            with open(filename,"w") as outfilew:
                #dataToAdd is in Array 
                simplejson.dump(data, outfilew)
            return     
       
        with open(filename, "r") as outfile:
            productRead = simplejson.loads(outfile.read())
            productRead.append(data[0])
        with open(filename,"w") as outfilew:
            simplejson.dump(productRead, outfilew)       






    def _set_headers(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
    
    def do_GET(self):
        self._set_headers()
        if None != re.search('/transaction', self.path):
            data = '[{"productName":"ok","price":150,"date":"02/06/2022","qty":10,"total_Amount":150,"type":"sell"},{"productName":"ok","price":150,"date":"02/06/2022","qty":10,"total_Amount":150,"type":"buy"}]'
            self.wfile.write(data.encode())
            return
        elif None != re.search('/products',self.path):
            data = '[{"productName":"ok","purchasePrice":150,"qty":10,"sellingPrice":150,"date":"02/06/2022"},{"productName":"manish","purchasePrice":150,"qty":10,"sellingPrice":150,"date":"02/06/2022"}]'
            self.wfile.write(data.encode())
            return
        self.wfile.write('{"msg":"API IS WORKING!"}'.encode())
        return

    def do_POST(self):
        self._set_headers()
        print("in post method")
        post_data = self.rfile.read(int(self.headers['Content-Length']))
      
        if None != re.search('/addPurchase', self.path):
            self.readWriteFile("products.json",post_data)
            self.wfile.write('{"msg":"Data saved Successfully!"}'.encode())
            return
        self.wfile.write('{"msg":"API POST HITS!"}'.encode())
        return

    
def main():
    PORT = 8000
    server = HTTPServer(('',PORT),echoHandler)
    print('Server running on port %s' % PORT)
    server.serve_forever()

if __name__ == '__main__':
    main() 