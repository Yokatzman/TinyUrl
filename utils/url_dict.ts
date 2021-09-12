import mongoose, { Schema } from 'mongoose';

//const mongoose = require('mongoose')
//const Schema = mongoose.Schema;


interface IUrl extends mongoose.Document{
  bigUrl: string;
  tinyUrl: string;
}

class CacheUrl{
  bigUrl: string=''
  tinyUrl: string=''
}

const urlSchema = new Schema({
  bigUrl: {
    type: String,
    required: true,
  },
  tinyUrl: {
    type: String,
    required: true,
  },
});

const UrlDict = mongoose.model<IUrl>('UrlDict', urlSchema);
export {UrlDict, CacheUrl};