import { MongoClient, MongoClientOptions } from 'mongodb';

const url =
  'mongodb+srv://hminwo98:Mj5a0lpIu38jbHg1@cluster0.wei3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const options: MongoClientOptions = {};  // 옵션을 비워둠

let connectDB: Promise<MongoClient>;

// `global` 객체에 `_mongo` 속성을 추가하기 위해 타입 선언
declare global {
  var _mongo: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // 개발 환경에서는 전역 변수에 MongoClient를 캐싱하여 재사용
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  // 프로덕션 환경에서는 전역 변수를 사용하지 않고 새 연결 생성
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
