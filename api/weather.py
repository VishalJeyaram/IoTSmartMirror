from flask import Flask, request, jsonify, redirect, abort, render_template, Response
import googleapiclient.discovery
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from dateutil.parser import parse as dtparse
import pickle
import os
from datetime import datetime
import urllib
import tzlocal
import requests
import json


app = Flask(__name__)
cal_count = 0
complete_events = []

def get_calendar():
    global cal_count
    global complete_events
    if cal_count == 0:
        tmfmt = '%d %B, %H:%M %p'
        creds =  None
        SCOPES  = ['https://www.googleapis.com/auth/calendar.readonly']
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('token.pickle'):
            with  open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
                # Save the credentials for the next run
                # with open('token.pickle', 'wb') as token: # can't write files in Google App Engine so comment out or delete
                # pickle.dump(creds, token)
        service = googleapiclient.discovery.build('calendar', 'v3', credentials=creds)
        # Call the Calendar API
        now = datetime.utcnow().isoformat() +  'Z'  # 'Z' indicates UTC time
        print('Getting the upcoming 10 events')
        events_result = service.events().list(calendarId='primary', timeMin=now, maxResults=10, singleEvents=True, orderBy='startTime').execute()
        events = events_result.get('items', [])
        if not events:
            print('No upcoming events found.')
        #for event in events:
        #    start = event['start'].get('dateTime', event['start'].get('date'))
        # print(start, event['summary'])
        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            stime = datetime.strftime(dtparse(start), format=tmfmt)
            complete_events.append(
                                    (
                                        stime,
                                        event["summary"]
                                    )
                                )
        cal_count += 1
 #   event_start = [event['start'].get('dateTime', event['start'].get('date')) for event in events]
 #   event_list = [event["summary"] for event in events]
    
        return
    else:
        return

@app.route("/weather", methods=['GET','POST'])
def get_weather():
    global complete_events
    get_calendar()
    #print(events_list, cal_count)
    
    
    if request.method == "POST":    
        city = request.form['city']
        country = request.form['country']
        api_key = 'f49f744b773835aaa779317ef1712279'

        url = requests.get(
            f'http://api.openweathermap.org/data/2.5/weather?appid={api_key}&q={city},{country}&units=metric')
        returned_data = url.json()

        sunrise_timestamp = float( str(returned_data['sys']['sunrise']))
        sunset_timestamp = float( str(returned_data['sys']['sunset']))
        
        sunrise_time = datetime.fromtimestamp(sunrise_timestamp, tzlocal.get_localzone()).strftime('%d-%m-%Y, %H:%M:%S')
        sunset_time = datetime.fromtimestamp(sunset_timestamp, tzlocal.get_localzone()).strftime('%d-%m-%Y, %H:%M:%S')

        display_data = {
            "temp": str(returned_data['main']['temp']),
            "place": str(returned_data['name']),
            "desc": str(returned_data['weather'][0]['description']),
            "icon": str(returned_data['weather'][0]['icon']),
            "sunrise": sunrise_time,
            "sunset": sunset_time,
        }
        print(display_data)
        return render_template('weather_results.jinja2', title='Weather App', data=display_data, events=complete_events)

    return render_template('home.jinja2', title='Weather App', events=complete_events)
#    data = request.get_json()
#    print(data)
#    return render_template("geo.html")

if __name__ == '__main__':
    app.run(debug=True)