import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import json
#
# prediction script
# input is a string
def predict(date):
  
  open_model = joblib.load('./models/open_model.pkl')
  close_model = joblib.load('./models/close_model.pkl')
  high_model = joblib.load('./models/high_model.pkl')
  low_model = joblib.load('./models/low_model.pkl')

  curr_day = pd.to_datetime(date)
  X_pred = pd.DataFrame(columns=['year', 'month', 'day', 'dayofweek'])

  for i in range(7):
    curr_day = curr_day + pd.Timedelta(days=1)
    if curr_day.dayofweek == 5 or curr_day.dayofweek == 6:
      continue

    X_pred.loc[i] = [curr_day.year, curr_day.month, curr_day.day, curr_day.dayofweek]
  
  results = [open_model.predict(X_pred), close_model.predict(X_pred), high_model.predict(X_pred), low_model.predict(X_pred)]
  
  for i in range(len(results)):
    results[i] = results[i].tolist()
  
  
  preds_json = json.dumps(results)
  print(preds_json)

date = str(input())
predict(date)
