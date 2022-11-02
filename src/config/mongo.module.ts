import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'sitesMarketingDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_SITE_MARKETING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'sitesWearDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_SITE_WEAR'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'sitesFoodDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_SITE_FOOD'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
   
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'pagesWearDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_PAGE_WEAR'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'pagesFoodDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_PAGE_FOOD'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'pagesMarketingDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_PAGE_MARKETING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'usersMarketingDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_USER_MARKETING'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'pagesEducationDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_PAGE_EDUCATION'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'pagesMarketingDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_PAGE_MARKETING'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),

    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'articlesDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_ARTICLES'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'usersDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_USERS'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'wearsDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_WEARS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'toolsDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_TOOLS'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'glassesDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_GLASSES'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'enginiesDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_ENGINIES'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   connectionName: 'furnituriesDB',
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL_FURNITURIES'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'foodsDB',
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL_FOODS'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoModule {}
// @Module({
//   imports: [
//     MongooseModule.forRootAsync({
//       useFactory: async (configService: ConfigService) => ({
//         uri: configService.get<string>('MONGODB_URL'),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class MongoModule {}
