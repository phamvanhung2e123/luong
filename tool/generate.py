#!/usr/bin/python
# coding: UTF-8
 
# CSVファイルの読み込み
 
import csv
from pymongo import Connection
import time
#コネクション作成
con = Connection('localhost', 27017)
db = con.log

logmodel = db.logmodels


filename = "test.csv"
csvfile = open(filename)
print csvfile


for row in csv.reader(csvfile):
    time.sleep(0.5)
    logmodel.insert({
        'sp_id': row[0],
        'log_id': row[1],
        'uuid': row[2],
        'last_login_date': row[3],
        'register_date': row[4],
        'first_paid_date': row[5],
        'tutorial_flag': row[6],
        'now_game_area': row[7],
        'now_game_stage': row[8],
        'energy_having': row[9],
        'gem_having': row[10],
        'energy_using': row[11],
        'gem_using': row[12],
        'payment': row[13],
        'get_warriors_id': row[14],
        'battle_result': row[15],
        'warriors_number': row[16],
        'device_time': row[17],
        'create_date': row[18],
        'device_os': row[19],
        'device_name': row[20],
        'miss': row[21],
        'hatena': row[22],
    })
    
    print row        # 1行のリスト
    for elem in row:

        print elem,    # 行の中の要素
    print
 
csvfile.close()
print csvfile
