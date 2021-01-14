import database from '../../config/database';
import { LogLevels, mongoose, ReturnModelType, setLogLevel } from '@typegoose/typegoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { UserModel } from '../models/user/entity';
import { ClientSession } from 'mongoose';
import { MatchModel } from '../models/match/entity';
import { ChallengeModel } from '../models/challenge/entity';

export class DatabaseHelpers {
  static async connectDatabase(connString): Promise<void> {
    if (process.env.NODE_ENV == 'test') {
      const replSet = new MongoMemoryReplSet({
        replSet: { storageEngine: 'wiredTiger' },
      });
      await replSet.waitUntilRunning();
      connString = await replSet.getUri();
    }

    await mongoose.connect(connString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      replicaSet: 'rs0',
      useUnifiedTopology: true,
    });
    mongoose.set('debug', true);
    setLogLevel(LogLevels.TRACE);
  }

  static async closeDatabaseConn(): Promise<void> {
    await mongoose.connection.close();
  }

  static async dropDatabase(): Promise<void> {
    await mongoose.connection.dropDatabase();
  }

  static async createCollections(models: ReturnModelType<any, {}>[]): Promise<void> {
    for (const model of models) {
      try {
        await model.createCollection();
        await model.init();
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

export const connectDatabase = async (): Promise<void> => {
  await DatabaseHelpers.connectDatabase(database.mongo.connString);
};

export const createCollections = async (): Promise<void> => {
  await DatabaseHelpers.createCollections([UserModel, MatchModel, ChallengeModel]);
};

export const closeDatabaseConn = async (): Promise<void> => {
  await DatabaseHelpers.closeDatabaseConn();
};

export async function withTransaction<T>(func: (session: ClientSession) => Promise<T>) {
  const session: ClientSession = await mongoose.startSession();

  try {
    session.startTransaction();
    const res = await func(session);
    await session.commitTransaction();
    return res;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}

// mongodb+srv://admin:<password>@cluster0.94akg.mongodb.net/<dbname>?retryWrites=true&w=majority
