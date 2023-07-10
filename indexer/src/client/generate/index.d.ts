
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type Tracker_StatePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {}
  scalars: $Extensions.GetResult<{
    contractAddress: string
    lastBlockProcessed: number
    chainId: string
  }, ExtArgs["result"]["tracker_State"]>
  composites: {}
}

/**
 * Model Tracker_State
 * 
 */
export type Tracker_State = runtime.Types.DefaultSelection<Tracker_StatePayload>
export type Dead_events_queuePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {}
  scalars: $Extensions.GetResult<{
    id: number
    eventName: string
    data: string
  }, ExtArgs["result"]["dead_events_queue"]>
  composites: {}
}

/**
 * Model Dead_events_queue
 * 
 */
export type Dead_events_queue = runtime.Types.DefaultSelection<Dead_events_queuePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tracker_States
 * const tracker_States = await prisma.tracker_State.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tracker_States
   * const tracker_States = await prisma.tracker_State.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tracker_State`: Exposes CRUD operations for the **Tracker_State** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tracker_States
    * const tracker_States = await prisma.tracker_State.findMany()
    * ```
    */
  get tracker_State(): Prisma.Tracker_StateDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.dead_events_queue`: Exposes CRUD operations for the **Dead_events_queue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dead_events_queues
    * const dead_events_queues = await prisma.dead_events_queue.findMany()
    * ```
    */
  get dead_events_queue(): Prisma.Dead_events_queueDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.0
   * Query Engine version: b20ead4d3ab9e78ac112966e242ded703f4a052c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tracker_State: 'Tracker_State',
    Dead_events_queue: 'Dead_events_queue'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
      meta: {
        modelProps: 'tracker_State' | 'dead_events_queue'
        txIsolationLevel: Prisma.TransactionIsolationLevel
      },
      model: {
      Tracker_State: {
        findUnique: {
          args: Prisma.Tracker_StateFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.Tracker_StateFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.Tracker_StateFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.Tracker_StateFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        findMany: {
          args: Prisma.Tracker_StateFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        create: {
          args: Prisma.Tracker_StateCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        createMany: {
          args: Prisma.Tracker_StateCreateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        delete: {
          args: Prisma.Tracker_StateDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        update: {
          args: Prisma.Tracker_StateUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.Tracker_StateDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.Tracker_StateUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        upsert: {
          args: Prisma.Tracker_StateUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.Tracker_StateAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.Tracker_StateGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
        count: {
          args: Prisma.Tracker_StateCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Tracker_State>
          payload: Tracker_StatePayload<ExtArgs>
        }
      }
      Dead_events_queue: {
        findUnique: {
          args: Prisma.Dead_events_queueFindUniqueArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        findUniqueOrThrow: {
          args: Prisma.Dead_events_queueFindUniqueOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        findFirst: {
          args: Prisma.Dead_events_queueFindFirstArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        findFirstOrThrow: {
          args: Prisma.Dead_events_queueFindFirstOrThrowArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        findMany: {
          args: Prisma.Dead_events_queueFindManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        create: {
          args: Prisma.Dead_events_queueCreateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        createMany: {
          args: Prisma.Dead_events_queueCreateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        delete: {
          args: Prisma.Dead_events_queueDeleteArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        update: {
          args: Prisma.Dead_events_queueUpdateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        deleteMany: {
          args: Prisma.Dead_events_queueDeleteManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        updateMany: {
          args: Prisma.Dead_events_queueUpdateManyArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        upsert: {
          args: Prisma.Dead_events_queueUpsertArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        aggregate: {
          args: Prisma.Dead_events_queueAggregateArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        groupBy: {
          args: Prisma.Dead_events_queueGroupByArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
        count: {
          args: Prisma.Dead_events_queueCountArgs<ExtArgs>,
          result: $Utils.OptionalFlat<Dead_events_queue>
          payload: Dead_events_queuePayload<ExtArgs>
        }
      }
    }
  } & {
    other: {
      $executeRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
        payload: any
      }
      $executeRaw: {
        args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
        result: any
        payload: any
      }
      $queryRawUnsafe: {
        args: [query: string, ...values: any[]],
        result: any
        payload: any
      }
      $queryRaw: {
        args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
        result: any
        payload: any
      }
    }
  }
    export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Tracker_State
   */


  export type AggregateTracker_State = {
    _count: Tracker_StateCountAggregateOutputType | null
    _avg: Tracker_StateAvgAggregateOutputType | null
    _sum: Tracker_StateSumAggregateOutputType | null
    _min: Tracker_StateMinAggregateOutputType | null
    _max: Tracker_StateMaxAggregateOutputType | null
  }

  export type Tracker_StateAvgAggregateOutputType = {
    lastBlockProcessed: number | null
  }

  export type Tracker_StateSumAggregateOutputType = {
    lastBlockProcessed: number | null
  }

  export type Tracker_StateMinAggregateOutputType = {
    contractAddress: string | null
    lastBlockProcessed: number | null
    chainId: string | null
  }

  export type Tracker_StateMaxAggregateOutputType = {
    contractAddress: string | null
    lastBlockProcessed: number | null
    chainId: string | null
  }

  export type Tracker_StateCountAggregateOutputType = {
    contractAddress: number
    lastBlockProcessed: number
    chainId: number
    _all: number
  }


  export type Tracker_StateAvgAggregateInputType = {
    lastBlockProcessed?: true
  }

  export type Tracker_StateSumAggregateInputType = {
    lastBlockProcessed?: true
  }

  export type Tracker_StateMinAggregateInputType = {
    contractAddress?: true
    lastBlockProcessed?: true
    chainId?: true
  }

  export type Tracker_StateMaxAggregateInputType = {
    contractAddress?: true
    lastBlockProcessed?: true
    chainId?: true
  }

  export type Tracker_StateCountAggregateInputType = {
    contractAddress?: true
    lastBlockProcessed?: true
    chainId?: true
    _all?: true
  }

  export type Tracker_StateAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracker_State to aggregate.
     */
    where?: Tracker_StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracker_States to fetch.
     */
    orderBy?: Enumerable<Tracker_StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Tracker_StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracker_States from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracker_States.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tracker_States
    **/
    _count?: true | Tracker_StateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tracker_StateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tracker_StateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tracker_StateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tracker_StateMaxAggregateInputType
  }

  export type GetTracker_StateAggregateType<T extends Tracker_StateAggregateArgs> = {
        [P in keyof T & keyof AggregateTracker_State]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTracker_State[P]>
      : GetScalarType<T[P], AggregateTracker_State[P]>
  }




  export type Tracker_StateGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Tracker_StateWhereInput
    orderBy?: Enumerable<Tracker_StateOrderByWithAggregationInput>
    by: Tracker_StateScalarFieldEnum[]
    having?: Tracker_StateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tracker_StateCountAggregateInputType | true
    _avg?: Tracker_StateAvgAggregateInputType
    _sum?: Tracker_StateSumAggregateInputType
    _min?: Tracker_StateMinAggregateInputType
    _max?: Tracker_StateMaxAggregateInputType
  }


  export type Tracker_StateGroupByOutputType = {
    contractAddress: string
    lastBlockProcessed: number
    chainId: string
    _count: Tracker_StateCountAggregateOutputType | null
    _avg: Tracker_StateAvgAggregateOutputType | null
    _sum: Tracker_StateSumAggregateOutputType | null
    _min: Tracker_StateMinAggregateOutputType | null
    _max: Tracker_StateMaxAggregateOutputType | null
  }

  type GetTracker_StateGroupByPayload<T extends Tracker_StateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Tracker_StateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tracker_StateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tracker_StateGroupByOutputType[P]>
            : GetScalarType<T[P], Tracker_StateGroupByOutputType[P]>
        }
      >
    >


  export type Tracker_StateSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contractAddress?: boolean
    lastBlockProcessed?: boolean
    chainId?: boolean
  }, ExtArgs["result"]["tracker_State"]>

  export type Tracker_StateSelectScalar = {
    contractAddress?: boolean
    lastBlockProcessed?: boolean
    chainId?: boolean
  }


  type Tracker_StateGetPayload<S extends boolean | null | undefined | Tracker_StateArgs> = $Types.GetResult<Tracker_StatePayload, S>

  type Tracker_StateCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Tracker_StateFindManyArgs, 'select' | 'include'> & {
      select?: Tracker_StateCountAggregateInputType | true
    }

  export interface Tracker_StateDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tracker_State'], meta: { name: 'Tracker_State' } }
    /**
     * Find zero or one Tracker_State that matches the filter.
     * @param {Tracker_StateFindUniqueArgs} args - Arguments to find a Tracker_State
     * @example
     * // Get one Tracker_State
     * const tracker_State = await prisma.tracker_State.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Tracker_StateFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Tracker_StateFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tracker_State'> extends True ? Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Tracker_State that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Tracker_StateFindUniqueOrThrowArgs} args - Arguments to find a Tracker_State
     * @example
     * // Get one Tracker_State
     * const tracker_State = await prisma.tracker_State.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Tracker_StateFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Tracker_StateFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Tracker_State that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateFindFirstArgs} args - Arguments to find a Tracker_State
     * @example
     * // Get one Tracker_State
     * const tracker_State = await prisma.tracker_State.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Tracker_StateFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Tracker_StateFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tracker_State'> extends True ? Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Tracker_State that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateFindFirstOrThrowArgs} args - Arguments to find a Tracker_State
     * @example
     * // Get one Tracker_State
     * const tracker_State = await prisma.tracker_State.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Tracker_StateFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Tracker_StateFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Tracker_States that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tracker_States
     * const tracker_States = await prisma.tracker_State.findMany()
     * 
     * // Get first 10 Tracker_States
     * const tracker_States = await prisma.tracker_State.findMany({ take: 10 })
     * 
     * // Only select the `contractAddress`
     * const tracker_StateWithContractAddressOnly = await prisma.tracker_State.findMany({ select: { contractAddress: true } })
     * 
    **/
    findMany<T extends Tracker_StateFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Tracker_StateFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Tracker_State.
     * @param {Tracker_StateCreateArgs} args - Arguments to create a Tracker_State.
     * @example
     * // Create one Tracker_State
     * const Tracker_State = await prisma.tracker_State.create({
     *   data: {
     *     // ... data to create a Tracker_State
     *   }
     * })
     * 
    **/
    create<T extends Tracker_StateCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Tracker_StateCreateArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Tracker_States.
     *     @param {Tracker_StateCreateManyArgs} args - Arguments to create many Tracker_States.
     *     @example
     *     // Create many Tracker_States
     *     const tracker_State = await prisma.tracker_State.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Tracker_StateCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Tracker_StateCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tracker_State.
     * @param {Tracker_StateDeleteArgs} args - Arguments to delete one Tracker_State.
     * @example
     * // Delete one Tracker_State
     * const Tracker_State = await prisma.tracker_State.delete({
     *   where: {
     *     // ... filter to delete one Tracker_State
     *   }
     * })
     * 
    **/
    delete<T extends Tracker_StateDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Tracker_StateDeleteArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Tracker_State.
     * @param {Tracker_StateUpdateArgs} args - Arguments to update one Tracker_State.
     * @example
     * // Update one Tracker_State
     * const tracker_State = await prisma.tracker_State.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Tracker_StateUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Tracker_StateUpdateArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Tracker_States.
     * @param {Tracker_StateDeleteManyArgs} args - Arguments to filter Tracker_States to delete.
     * @example
     * // Delete a few Tracker_States
     * const { count } = await prisma.tracker_State.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Tracker_StateDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Tracker_StateDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracker_States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tracker_States
     * const tracker_State = await prisma.tracker_State.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Tracker_StateUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Tracker_StateUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tracker_State.
     * @param {Tracker_StateUpsertArgs} args - Arguments to update or create a Tracker_State.
     * @example
     * // Update or create a Tracker_State
     * const tracker_State = await prisma.tracker_State.upsert({
     *   create: {
     *     // ... data to create a Tracker_State
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tracker_State we want to update
     *   }
     * })
    **/
    upsert<T extends Tracker_StateUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Tracker_StateUpsertArgs<ExtArgs>>
    ): Prisma__Tracker_StateClient<$Types.GetResult<Tracker_StatePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Tracker_States.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateCountArgs} args - Arguments to filter Tracker_States to count.
     * @example
     * // Count the number of Tracker_States
     * const count = await prisma.tracker_State.count({
     *   where: {
     *     // ... the filter for the Tracker_States we want to count
     *   }
     * })
    **/
    count<T extends Tracker_StateCountArgs>(
      args?: Subset<T, Tracker_StateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tracker_StateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tracker_State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Tracker_StateAggregateArgs>(args: Subset<T, Tracker_StateAggregateArgs>): Prisma.PrismaPromise<GetTracker_StateAggregateType<T>>

    /**
     * Group by Tracker_State.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tracker_StateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Tracker_StateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Tracker_StateGroupByArgs['orderBy'] }
        : { orderBy?: Tracker_StateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Tracker_StateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTracker_StateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tracker_State.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Tracker_StateClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tracker_State base type for findUnique actions
   */
  export type Tracker_StateFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter, which Tracker_State to fetch.
     */
    where: Tracker_StateWhereUniqueInput
  }

  /**
   * Tracker_State findUnique
   */
  export interface Tracker_StateFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Tracker_StateFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tracker_State findUniqueOrThrow
   */
  export type Tracker_StateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter, which Tracker_State to fetch.
     */
    where: Tracker_StateWhereUniqueInput
  }


  /**
   * Tracker_State base type for findFirst actions
   */
  export type Tracker_StateFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter, which Tracker_State to fetch.
     */
    where?: Tracker_StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracker_States to fetch.
     */
    orderBy?: Enumerable<Tracker_StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracker_States.
     */
    cursor?: Tracker_StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracker_States from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracker_States.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracker_States.
     */
    distinct?: Enumerable<Tracker_StateScalarFieldEnum>
  }

  /**
   * Tracker_State findFirst
   */
  export interface Tracker_StateFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Tracker_StateFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tracker_State findFirstOrThrow
   */
  export type Tracker_StateFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter, which Tracker_State to fetch.
     */
    where?: Tracker_StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracker_States to fetch.
     */
    orderBy?: Enumerable<Tracker_StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracker_States.
     */
    cursor?: Tracker_StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracker_States from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracker_States.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracker_States.
     */
    distinct?: Enumerable<Tracker_StateScalarFieldEnum>
  }


  /**
   * Tracker_State findMany
   */
  export type Tracker_StateFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter, which Tracker_States to fetch.
     */
    where?: Tracker_StateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracker_States to fetch.
     */
    orderBy?: Enumerable<Tracker_StateOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tracker_States.
     */
    cursor?: Tracker_StateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracker_States from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracker_States.
     */
    skip?: number
    distinct?: Enumerable<Tracker_StateScalarFieldEnum>
  }


  /**
   * Tracker_State create
   */
  export type Tracker_StateCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * The data needed to create a Tracker_State.
     */
    data: XOR<Tracker_StateCreateInput, Tracker_StateUncheckedCreateInput>
  }


  /**
   * Tracker_State createMany
   */
  export type Tracker_StateCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tracker_States.
     */
    data: Enumerable<Tracker_StateCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tracker_State update
   */
  export type Tracker_StateUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * The data needed to update a Tracker_State.
     */
    data: XOR<Tracker_StateUpdateInput, Tracker_StateUncheckedUpdateInput>
    /**
     * Choose, which Tracker_State to update.
     */
    where: Tracker_StateWhereUniqueInput
  }


  /**
   * Tracker_State updateMany
   */
  export type Tracker_StateUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tracker_States.
     */
    data: XOR<Tracker_StateUpdateManyMutationInput, Tracker_StateUncheckedUpdateManyInput>
    /**
     * Filter which Tracker_States to update
     */
    where?: Tracker_StateWhereInput
  }


  /**
   * Tracker_State upsert
   */
  export type Tracker_StateUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * The filter to search for the Tracker_State to update in case it exists.
     */
    where: Tracker_StateWhereUniqueInput
    /**
     * In case the Tracker_State found by the `where` argument doesn't exist, create a new Tracker_State with this data.
     */
    create: XOR<Tracker_StateCreateInput, Tracker_StateUncheckedCreateInput>
    /**
     * In case the Tracker_State was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Tracker_StateUpdateInput, Tracker_StateUncheckedUpdateInput>
  }


  /**
   * Tracker_State delete
   */
  export type Tracker_StateDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
    /**
     * Filter which Tracker_State to delete.
     */
    where: Tracker_StateWhereUniqueInput
  }


  /**
   * Tracker_State deleteMany
   */
  export type Tracker_StateDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracker_States to delete
     */
    where?: Tracker_StateWhereInput
  }


  /**
   * Tracker_State without action
   */
  export type Tracker_StateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tracker_State
     */
    select?: Tracker_StateSelect<ExtArgs> | null
  }



  /**
   * Model Dead_events_queue
   */


  export type AggregateDead_events_queue = {
    _count: Dead_events_queueCountAggregateOutputType | null
    _avg: Dead_events_queueAvgAggregateOutputType | null
    _sum: Dead_events_queueSumAggregateOutputType | null
    _min: Dead_events_queueMinAggregateOutputType | null
    _max: Dead_events_queueMaxAggregateOutputType | null
  }

  export type Dead_events_queueAvgAggregateOutputType = {
    id: number | null
  }

  export type Dead_events_queueSumAggregateOutputType = {
    id: number | null
  }

  export type Dead_events_queueMinAggregateOutputType = {
    id: number | null
    eventName: string | null
    data: string | null
  }

  export type Dead_events_queueMaxAggregateOutputType = {
    id: number | null
    eventName: string | null
    data: string | null
  }

  export type Dead_events_queueCountAggregateOutputType = {
    id: number
    eventName: number
    data: number
    _all: number
  }


  export type Dead_events_queueAvgAggregateInputType = {
    id?: true
  }

  export type Dead_events_queueSumAggregateInputType = {
    id?: true
  }

  export type Dead_events_queueMinAggregateInputType = {
    id?: true
    eventName?: true
    data?: true
  }

  export type Dead_events_queueMaxAggregateInputType = {
    id?: true
    eventName?: true
    data?: true
  }

  export type Dead_events_queueCountAggregateInputType = {
    id?: true
    eventName?: true
    data?: true
    _all?: true
  }

  export type Dead_events_queueAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dead_events_queue to aggregate.
     */
    where?: Dead_events_queueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dead_events_queues to fetch.
     */
    orderBy?: Enumerable<Dead_events_queueOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Dead_events_queueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dead_events_queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dead_events_queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dead_events_queues
    **/
    _count?: true | Dead_events_queueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dead_events_queueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dead_events_queueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dead_events_queueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dead_events_queueMaxAggregateInputType
  }

  export type GetDead_events_queueAggregateType<T extends Dead_events_queueAggregateArgs> = {
        [P in keyof T & keyof AggregateDead_events_queue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDead_events_queue[P]>
      : GetScalarType<T[P], AggregateDead_events_queue[P]>
  }




  export type Dead_events_queueGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: Dead_events_queueWhereInput
    orderBy?: Enumerable<Dead_events_queueOrderByWithAggregationInput>
    by: Dead_events_queueScalarFieldEnum[]
    having?: Dead_events_queueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dead_events_queueCountAggregateInputType | true
    _avg?: Dead_events_queueAvgAggregateInputType
    _sum?: Dead_events_queueSumAggregateInputType
    _min?: Dead_events_queueMinAggregateInputType
    _max?: Dead_events_queueMaxAggregateInputType
  }


  export type Dead_events_queueGroupByOutputType = {
    id: number
    eventName: string
    data: string
    _count: Dead_events_queueCountAggregateOutputType | null
    _avg: Dead_events_queueAvgAggregateOutputType | null
    _sum: Dead_events_queueSumAggregateOutputType | null
    _min: Dead_events_queueMinAggregateOutputType | null
    _max: Dead_events_queueMaxAggregateOutputType | null
  }

  type GetDead_events_queueGroupByPayload<T extends Dead_events_queueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Dead_events_queueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dead_events_queueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dead_events_queueGroupByOutputType[P]>
            : GetScalarType<T[P], Dead_events_queueGroupByOutputType[P]>
        }
      >
    >


  export type Dead_events_queueSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventName?: boolean
    data?: boolean
  }, ExtArgs["result"]["dead_events_queue"]>

  export type Dead_events_queueSelectScalar = {
    id?: boolean
    eventName?: boolean
    data?: boolean
  }


  type Dead_events_queueGetPayload<S extends boolean | null | undefined | Dead_events_queueArgs> = $Types.GetResult<Dead_events_queuePayload, S>

  type Dead_events_queueCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<Dead_events_queueFindManyArgs, 'select' | 'include'> & {
      select?: Dead_events_queueCountAggregateInputType | true
    }

  export interface Dead_events_queueDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dead_events_queue'], meta: { name: 'Dead_events_queue' } }
    /**
     * Find zero or one Dead_events_queue that matches the filter.
     * @param {Dead_events_queueFindUniqueArgs} args - Arguments to find a Dead_events_queue
     * @example
     * // Get one Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends Dead_events_queueFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, Dead_events_queueFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Dead_events_queue'> extends True ? Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Dead_events_queue that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {Dead_events_queueFindUniqueOrThrowArgs} args - Arguments to find a Dead_events_queue
     * @example
     * // Get one Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends Dead_events_queueFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Dead_events_queueFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Dead_events_queue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueFindFirstArgs} args - Arguments to find a Dead_events_queue
     * @example
     * // Get one Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends Dead_events_queueFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, Dead_events_queueFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Dead_events_queue'> extends True ? Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Dead_events_queue that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueFindFirstOrThrowArgs} args - Arguments to find a Dead_events_queue
     * @example
     * // Get one Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends Dead_events_queueFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, Dead_events_queueFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Dead_events_queues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dead_events_queues
     * const dead_events_queues = await prisma.dead_events_queue.findMany()
     * 
     * // Get first 10 Dead_events_queues
     * const dead_events_queues = await prisma.dead_events_queue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dead_events_queueWithIdOnly = await prisma.dead_events_queue.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends Dead_events_queueFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Dead_events_queueFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Dead_events_queue.
     * @param {Dead_events_queueCreateArgs} args - Arguments to create a Dead_events_queue.
     * @example
     * // Create one Dead_events_queue
     * const Dead_events_queue = await prisma.dead_events_queue.create({
     *   data: {
     *     // ... data to create a Dead_events_queue
     *   }
     * })
     * 
    **/
    create<T extends Dead_events_queueCreateArgs<ExtArgs>>(
      args: SelectSubset<T, Dead_events_queueCreateArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Dead_events_queues.
     *     @param {Dead_events_queueCreateManyArgs} args - Arguments to create many Dead_events_queues.
     *     @example
     *     // Create many Dead_events_queues
     *     const dead_events_queue = await prisma.dead_events_queue.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends Dead_events_queueCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Dead_events_queueCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Dead_events_queue.
     * @param {Dead_events_queueDeleteArgs} args - Arguments to delete one Dead_events_queue.
     * @example
     * // Delete one Dead_events_queue
     * const Dead_events_queue = await prisma.dead_events_queue.delete({
     *   where: {
     *     // ... filter to delete one Dead_events_queue
     *   }
     * })
     * 
    **/
    delete<T extends Dead_events_queueDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, Dead_events_queueDeleteArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Dead_events_queue.
     * @param {Dead_events_queueUpdateArgs} args - Arguments to update one Dead_events_queue.
     * @example
     * // Update one Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends Dead_events_queueUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, Dead_events_queueUpdateArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Dead_events_queues.
     * @param {Dead_events_queueDeleteManyArgs} args - Arguments to filter Dead_events_queues to delete.
     * @example
     * // Delete a few Dead_events_queues
     * const { count } = await prisma.dead_events_queue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends Dead_events_queueDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, Dead_events_queueDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dead_events_queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dead_events_queues
     * const dead_events_queue = await prisma.dead_events_queue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends Dead_events_queueUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, Dead_events_queueUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dead_events_queue.
     * @param {Dead_events_queueUpsertArgs} args - Arguments to update or create a Dead_events_queue.
     * @example
     * // Update or create a Dead_events_queue
     * const dead_events_queue = await prisma.dead_events_queue.upsert({
     *   create: {
     *     // ... data to create a Dead_events_queue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dead_events_queue we want to update
     *   }
     * })
    **/
    upsert<T extends Dead_events_queueUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, Dead_events_queueUpsertArgs<ExtArgs>>
    ): Prisma__Dead_events_queueClient<$Types.GetResult<Dead_events_queuePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Dead_events_queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueCountArgs} args - Arguments to filter Dead_events_queues to count.
     * @example
     * // Count the number of Dead_events_queues
     * const count = await prisma.dead_events_queue.count({
     *   where: {
     *     // ... the filter for the Dead_events_queues we want to count
     *   }
     * })
    **/
    count<T extends Dead_events_queueCountArgs>(
      args?: Subset<T, Dead_events_queueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dead_events_queueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dead_events_queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dead_events_queueAggregateArgs>(args: Subset<T, Dead_events_queueAggregateArgs>): Prisma.PrismaPromise<GetDead_events_queueAggregateType<T>>

    /**
     * Group by Dead_events_queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dead_events_queueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Dead_events_queueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Dead_events_queueGroupByArgs['orderBy'] }
        : { orderBy?: Dead_events_queueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Dead_events_queueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDead_events_queueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Dead_events_queue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__Dead_events_queueClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Dead_events_queue base type for findUnique actions
   */
  export type Dead_events_queueFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter, which Dead_events_queue to fetch.
     */
    where: Dead_events_queueWhereUniqueInput
  }

  /**
   * Dead_events_queue findUnique
   */
  export interface Dead_events_queueFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Dead_events_queueFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Dead_events_queue findUniqueOrThrow
   */
  export type Dead_events_queueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter, which Dead_events_queue to fetch.
     */
    where: Dead_events_queueWhereUniqueInput
  }


  /**
   * Dead_events_queue base type for findFirst actions
   */
  export type Dead_events_queueFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter, which Dead_events_queue to fetch.
     */
    where?: Dead_events_queueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dead_events_queues to fetch.
     */
    orderBy?: Enumerable<Dead_events_queueOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dead_events_queues.
     */
    cursor?: Dead_events_queueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dead_events_queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dead_events_queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dead_events_queues.
     */
    distinct?: Enumerable<Dead_events_queueScalarFieldEnum>
  }

  /**
   * Dead_events_queue findFirst
   */
  export interface Dead_events_queueFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends Dead_events_queueFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Dead_events_queue findFirstOrThrow
   */
  export type Dead_events_queueFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter, which Dead_events_queue to fetch.
     */
    where?: Dead_events_queueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dead_events_queues to fetch.
     */
    orderBy?: Enumerable<Dead_events_queueOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dead_events_queues.
     */
    cursor?: Dead_events_queueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dead_events_queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dead_events_queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dead_events_queues.
     */
    distinct?: Enumerable<Dead_events_queueScalarFieldEnum>
  }


  /**
   * Dead_events_queue findMany
   */
  export type Dead_events_queueFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter, which Dead_events_queues to fetch.
     */
    where?: Dead_events_queueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dead_events_queues to fetch.
     */
    orderBy?: Enumerable<Dead_events_queueOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dead_events_queues.
     */
    cursor?: Dead_events_queueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dead_events_queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dead_events_queues.
     */
    skip?: number
    distinct?: Enumerable<Dead_events_queueScalarFieldEnum>
  }


  /**
   * Dead_events_queue create
   */
  export type Dead_events_queueCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * The data needed to create a Dead_events_queue.
     */
    data: XOR<Dead_events_queueCreateInput, Dead_events_queueUncheckedCreateInput>
  }


  /**
   * Dead_events_queue createMany
   */
  export type Dead_events_queueCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dead_events_queues.
     */
    data: Enumerable<Dead_events_queueCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Dead_events_queue update
   */
  export type Dead_events_queueUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * The data needed to update a Dead_events_queue.
     */
    data: XOR<Dead_events_queueUpdateInput, Dead_events_queueUncheckedUpdateInput>
    /**
     * Choose, which Dead_events_queue to update.
     */
    where: Dead_events_queueWhereUniqueInput
  }


  /**
   * Dead_events_queue updateMany
   */
  export type Dead_events_queueUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dead_events_queues.
     */
    data: XOR<Dead_events_queueUpdateManyMutationInput, Dead_events_queueUncheckedUpdateManyInput>
    /**
     * Filter which Dead_events_queues to update
     */
    where?: Dead_events_queueWhereInput
  }


  /**
   * Dead_events_queue upsert
   */
  export type Dead_events_queueUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * The filter to search for the Dead_events_queue to update in case it exists.
     */
    where: Dead_events_queueWhereUniqueInput
    /**
     * In case the Dead_events_queue found by the `where` argument doesn't exist, create a new Dead_events_queue with this data.
     */
    create: XOR<Dead_events_queueCreateInput, Dead_events_queueUncheckedCreateInput>
    /**
     * In case the Dead_events_queue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Dead_events_queueUpdateInput, Dead_events_queueUncheckedUpdateInput>
  }


  /**
   * Dead_events_queue delete
   */
  export type Dead_events_queueDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
    /**
     * Filter which Dead_events_queue to delete.
     */
    where: Dead_events_queueWhereUniqueInput
  }


  /**
   * Dead_events_queue deleteMany
   */
  export type Dead_events_queueDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dead_events_queues to delete
     */
    where?: Dead_events_queueWhereInput
  }


  /**
   * Dead_events_queue without action
   */
  export type Dead_events_queueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dead_events_queue
     */
    select?: Dead_events_queueSelect<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Tracker_StateScalarFieldEnum: {
    contractAddress: 'contractAddress',
    lastBlockProcessed: 'lastBlockProcessed',
    chainId: 'chainId'
  };

  export type Tracker_StateScalarFieldEnum = (typeof Tracker_StateScalarFieldEnum)[keyof typeof Tracker_StateScalarFieldEnum]


  export const Dead_events_queueScalarFieldEnum: {
    id: 'id',
    eventName: 'eventName',
    data: 'data'
  };

  export type Dead_events_queueScalarFieldEnum = (typeof Dead_events_queueScalarFieldEnum)[keyof typeof Dead_events_queueScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type Tracker_StateWhereInput = {
    AND?: Enumerable<Tracker_StateWhereInput>
    OR?: Enumerable<Tracker_StateWhereInput>
    NOT?: Enumerable<Tracker_StateWhereInput>
    contractAddress?: StringFilter | string
    lastBlockProcessed?: IntFilter | number
    chainId?: StringFilter | string
  }

  export type Tracker_StateOrderByWithRelationInput = {
    contractAddress?: SortOrder
    lastBlockProcessed?: SortOrder
    chainId?: SortOrder
  }

  export type Tracker_StateWhereUniqueInput = {
    contractAddress?: string
  }

  export type Tracker_StateOrderByWithAggregationInput = {
    contractAddress?: SortOrder
    lastBlockProcessed?: SortOrder
    chainId?: SortOrder
    _count?: Tracker_StateCountOrderByAggregateInput
    _avg?: Tracker_StateAvgOrderByAggregateInput
    _max?: Tracker_StateMaxOrderByAggregateInput
    _min?: Tracker_StateMinOrderByAggregateInput
    _sum?: Tracker_StateSumOrderByAggregateInput
  }

  export type Tracker_StateScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Tracker_StateScalarWhereWithAggregatesInput>
    OR?: Enumerable<Tracker_StateScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Tracker_StateScalarWhereWithAggregatesInput>
    contractAddress?: StringWithAggregatesFilter | string
    lastBlockProcessed?: IntWithAggregatesFilter | number
    chainId?: StringWithAggregatesFilter | string
  }

  export type Dead_events_queueWhereInput = {
    AND?: Enumerable<Dead_events_queueWhereInput>
    OR?: Enumerable<Dead_events_queueWhereInput>
    NOT?: Enumerable<Dead_events_queueWhereInput>
    id?: IntFilter | number
    eventName?: StringFilter | string
    data?: StringFilter | string
  }

  export type Dead_events_queueOrderByWithRelationInput = {
    id?: SortOrder
    eventName?: SortOrder
    data?: SortOrder
  }

  export type Dead_events_queueWhereUniqueInput = {
    id?: number
  }

  export type Dead_events_queueOrderByWithAggregationInput = {
    id?: SortOrder
    eventName?: SortOrder
    data?: SortOrder
    _count?: Dead_events_queueCountOrderByAggregateInput
    _avg?: Dead_events_queueAvgOrderByAggregateInput
    _max?: Dead_events_queueMaxOrderByAggregateInput
    _min?: Dead_events_queueMinOrderByAggregateInput
    _sum?: Dead_events_queueSumOrderByAggregateInput
  }

  export type Dead_events_queueScalarWhereWithAggregatesInput = {
    AND?: Enumerable<Dead_events_queueScalarWhereWithAggregatesInput>
    OR?: Enumerable<Dead_events_queueScalarWhereWithAggregatesInput>
    NOT?: Enumerable<Dead_events_queueScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    eventName?: StringWithAggregatesFilter | string
    data?: StringWithAggregatesFilter | string
  }

  export type Tracker_StateCreateInput = {
    contractAddress: string
    lastBlockProcessed: number
    chainId: string
  }

  export type Tracker_StateUncheckedCreateInput = {
    contractAddress: string
    lastBlockProcessed: number
    chainId: string
  }

  export type Tracker_StateUpdateInput = {
    contractAddress?: StringFieldUpdateOperationsInput | string
    lastBlockProcessed?: IntFieldUpdateOperationsInput | number
    chainId?: StringFieldUpdateOperationsInput | string
  }

  export type Tracker_StateUncheckedUpdateInput = {
    contractAddress?: StringFieldUpdateOperationsInput | string
    lastBlockProcessed?: IntFieldUpdateOperationsInput | number
    chainId?: StringFieldUpdateOperationsInput | string
  }

  export type Tracker_StateCreateManyInput = {
    contractAddress: string
    lastBlockProcessed: number
    chainId: string
  }

  export type Tracker_StateUpdateManyMutationInput = {
    contractAddress?: StringFieldUpdateOperationsInput | string
    lastBlockProcessed?: IntFieldUpdateOperationsInput | number
    chainId?: StringFieldUpdateOperationsInput | string
  }

  export type Tracker_StateUncheckedUpdateManyInput = {
    contractAddress?: StringFieldUpdateOperationsInput | string
    lastBlockProcessed?: IntFieldUpdateOperationsInput | number
    chainId?: StringFieldUpdateOperationsInput | string
  }

  export type Dead_events_queueCreateInput = {
    eventName: string
    data: string
  }

  export type Dead_events_queueUncheckedCreateInput = {
    id?: number
    eventName: string
    data: string
  }

  export type Dead_events_queueUpdateInput = {
    eventName?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type Dead_events_queueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventName?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type Dead_events_queueCreateManyInput = {
    id?: number
    eventName: string
    data: string
  }

  export type Dead_events_queueUpdateManyMutationInput = {
    eventName?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type Dead_events_queueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    eventName?: StringFieldUpdateOperationsInput | string
    data?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type Tracker_StateCountOrderByAggregateInput = {
    contractAddress?: SortOrder
    lastBlockProcessed?: SortOrder
    chainId?: SortOrder
  }

  export type Tracker_StateAvgOrderByAggregateInput = {
    lastBlockProcessed?: SortOrder
  }

  export type Tracker_StateMaxOrderByAggregateInput = {
    contractAddress?: SortOrder
    lastBlockProcessed?: SortOrder
    chainId?: SortOrder
  }

  export type Tracker_StateMinOrderByAggregateInput = {
    contractAddress?: SortOrder
    lastBlockProcessed?: SortOrder
    chainId?: SortOrder
  }

  export type Tracker_StateSumOrderByAggregateInput = {
    lastBlockProcessed?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type Dead_events_queueCountOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    data?: SortOrder
  }

  export type Dead_events_queueAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Dead_events_queueMaxOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    data?: SortOrder
  }

  export type Dead_events_queueMinOrderByAggregateInput = {
    id?: SortOrder
    eventName?: SortOrder
    data?: SortOrder
  }

  export type Dead_events_queueSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}