const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');
import { CacheUrl, UrlDict } from './utils/url_dict'
//import UrlDict = require('./utils/url_dict');
const atlasURI = 'mongodb+srv://chase:chase@tinyurl.o3ji9.mongodb.net/tinyUrl?retryWrites=true&w=majority'
let cacheSize: number = 32;
let cacheMap: Map<string, string> = new Map<string, string>();
cacheMap.has

let charArray: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const port = process.env.PORT || 3000;


mongoose.connect(atlasURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port))
    .catch((err: any) => console.log(err));



app.get('/:tinyUrl', (req: any, res: any) => {

    if (!req.params.tinyUrl) {
        res.status(400);
        res.send("please provide tinyUrl");
    }
    if (cacheMap.has(req.params.tinyurl)) {
        res.redirect(cacheMap.get(req.params.tinyurl));
        return;
    }
    console.log(req.params.tinyUrl);
    console.log('emptyget')
    UrlDict.findOne({ tinyUrl: req.params.tinyUrl }).then((result) => {
        if (!result) {
            console.log('noresult');
            //res.statusMessage = "the requested url is not in the database";
            res.status(400);
            res.send("the requested url is not in the database");
        } else {
            console.log(result?.bigUrl);
            move_ahead(req.params.tinyUrl);
            res.redirect(result?.bigUrl)
        }
    });
});

app.post('/', (req: any, res: any) => {
    console.log('post');
    if (!req.body.fullUrl) {
        res.status(400);
        res.send("please provide URL");
    } else {
        try {
            const url = new URL(req.body.fullUrl)
        } catch (error) {
            res.status(400);
            res.send("not a valid URL");
            return;
        }
        res.send('cool');

        let tiny: string = shortener(req.body.fullUrl);

        //adding a random character to the url in case of collision
        UrlDict.findOne({ tinyUrl: req.params.tinyUrl }).then((result) => {
            if (result){
               let num = Math.floor(Math.random()*62)
               let extraChar = charArray[num];
               tiny=tiny+extraChar;
            }
        })

        const newPair = new UrlDict({
            tinyUrl: tiny,
            bigUrl: req.body.fullUrl
        })
        if (cacheMap.size == cacheSize) {
            replace_oldest(tiny, req.body.fullUrl);
        }
        newPair.save().then((result) => res.send(result));
    }
});


//divides the url string into groups of 4, sums their ascii values, and uses that sum
//to computes a cell in the char array difined above, from which a char is chosen to be added to the tinyURL
function shortener(url: string) {
    let result: string = "";
    let length: number = url.length;
    let charCell: number = 0;
    for (let index = 0; index < length; index = index + 4) {
        let cellsLeft: number = length - index;
        let sum: number = 0;
        if (cellsLeft < 4) {
            for (let j = 0; j < cellsLeft; j++) {
                sum += url.charCodeAt(j + index);
            }
        } else {
            for (let k = 0; k < 4; k++) {
                sum += url.charCodeAt(k + index);
            }
        }
        //cellArray contains 62 cells
        charCell = sum % 62
        console.log(charCell);
        result += charArray[charCell];
    }
    return result;
}

function replace_oldest(tiny: string, big: string) {
    const iterator = cacheMap.entries();
    let first = iterator.next().value[0];
    cacheMap.delete(first);
    cacheMap.set(tiny, big);
}

function move_ahead(tiny: string) {
    let big: string = cacheMap.get(tiny)!;
    cacheMap.delete(tiny);
    cacheMap.set(tiny, big);
}


console.log('started');
