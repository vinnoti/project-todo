# project-todo

List End Point:

GET (url)/api/todo/detail?id=2
GET (url)/api/todo/list
POST (url)/api/todo/create
PATCH (url)/api/todo/update?id=2
DELETE (url)/api/todo/delete?id=2

response example:

## Success
```
{
    "errorMessage": null,
    "result": {
        "id": 2,
        "title": "Roro Kidul",
        "note": "Bikin Cerpen Roro Kidul Edited lagi"
    },
    "success": true
}
```
## Failed
```
{
    "errorMessage": "Todo Not Found",
    "result": null,
    "success": false
}
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
