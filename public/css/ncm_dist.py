# -*- coding: utf-8 -*-

from pymongo import MongoClient


import sys
import os


from os import listdir
from os.path import isfile, join

import json

import statistics


d = '/u/malricp/rdv/public/JSON_FOLDER_11/'
d_out = '/u/malricp/rdv/public/csvFromJSON11/'
dirs = [o for o in os.listdir(d) ]
tab = []
tabOut = []
for folderName in dirs:


  mypath = d+folderName

  #print("path : "+mypath) 
  if(os.path.isdir(mypath)):
    onlyfiles = [file for file in listdir(mypath+"/") if (isfile(join(mypath, file)) and file.endswith(".json"))]
    tab.append(len(onlyfiles))
    print("number of files : "+folderName+" : "+str(len(onlyfiles)))
  
print("sum : "+str(sum(tab)))
print("max : "+str(max(tab)))
print("min : "+str(min(tab)))


f = open(d_out+"ncmFreqDistribution.csv")
f.write("ncm,freq")
f.write("\n".join(x[1]+","+x[2] for x in tabOut))
f.close()
