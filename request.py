import requests
import time

url = "preview.devtst.io/api/testresult/UploadTestResults"

payload={}
files=[
  ('',('upload_data_0 (1).json',open('/D:/Brian/Download/upload_data.json','rb'),'application/json'))
]
headers = {
  'Cookie': 'dtplatform.auth=j95JhUr4F%2BgJCBkM4Uq9qYizfOWa%2BUzpYXYdJfgZZP%2FhyxB8u8kenfcJkp5CDEcBy2%2BlXTTE3lYBxO6Cs%2BTmTq1QVav3GnNbg3raqUXccyAtKI901QP3tpzk6D8cpIMqzYRQFReXqOv8Zp%2FSsBuk1C7d8jS3chQNFK8RC3vlzWbFtchoCIV2bj2HVfH2fnaxn2%2FwVgb%2BXG3rWVgJjEcsoStMBzp2S%2F4%2BM6CCQGs5vrw4scMtu%2Bk9DWRQKoR2bZTH'
}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
time.sleep(10) 
