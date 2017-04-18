# Attendance Router
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Used in conjunction with [aarpush](https://github.com/ghmeier/arppush) to automate attendance taking.

Live app running here [https://autohat.herokuapp.com/]()

## Scripts
`npm install` to install dependencies

`npm start` to start the application on [localhost:8080]()



## API

##### `POST /api/user` *creates a new user.* 
Example:
*Request*
```
POST localhost:8080/api/user
{
   "email" : "test@gmail.com",
   "mac" : "5C:E0:C5:98:D2:49"
}
``` 
*Response*
```
{
    message: 'User successfully created'
}
```

##### `GET /api/user` *returns all users* 
Example:
*Request*
```
GET localhost:8080/api/user
```
*Response*
```
[
  {
    "_id": "58dabe14640a050c34f76f8c",
    "mac": "5C:E0:C5:98:D2:49",
    "email": "test@gmail.com",
    "__v": 0
  }
]
````

##### `POST /api/arppush` *stores the given map of users and returns an attendance count*
Example:
*Request*
```
{
   "AC:CF:23:31:9B:33": {
      "ip": "192.168.1.132",
      "mac": "AC:CF:23:3F:9B:33",
      "vendor": "Raspberry Pi Foundation",
      "timestamp": 1427686747854
   },
   "b8:e9:37:11:d5:5c": {
      "ip": "192.168.1.140",
      "mac": "b8:e9:37:11:d5:5c",
      "vendor": "Sonos, Inc.",
      "timestamp": 1427686747854
   }
}
```
*Response*
```
{success:true}
```