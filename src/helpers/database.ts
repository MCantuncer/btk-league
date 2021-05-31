import database from '../../config/database';
import { DocumentType, LogLevels, mongoose, ReturnModelType, setLogLevel } from '@typegoose/typegoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { UserModel } from '../models/user/entity';
import { ClientSession, DocumentQuery, Model } from 'mongoose';
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

export class ModelUtils {
  public static async filterWithArgs<T>(query: DocumentQuery<DocumentType<T>[], DocumentType<T>, {}>, args: any) {
    for (let key of Object.keys(args)) {
      const filterInput = args[key];
      if (key === 'id') key = '_id';

      if (typeof filterInput.filterQuery == 'function' && Object.keys(filterInput).length !== 0) {
        query = filterInput.filterQuery(query, key);
      }
    }

    return () => query;
  }

  public static async findAndFilter<T>(manager: Model<DocumentType<T>>, args: any) {
    // @ts-ignore
    let query = manager.find();
    if (args) {
      query = (await ModelUtils.filterWithArgs(query, args))();
    }

    return () => query;
  }
}

// mongodb+srv://admin:<password>@cluster0.94akg.mongodb.net/<dbname>?retryWrites=true&w=majority
