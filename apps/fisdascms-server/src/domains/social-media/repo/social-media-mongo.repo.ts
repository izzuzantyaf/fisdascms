import { isEmpty } from 'class-validator';
import { Model } from 'mongoose';
import {
  SocialMedia,
  SocialMediaDocument,
} from '../entities/social-media.entity';
import { MongoGenericRepository } from 'src/database/repo/mongo-generic.repo';

export class SocialMediaMongoRepository extends MongoGenericRepository<SocialMedia> {
  constructor(repository: Model<SocialMediaDocument>) {
    super(repository);
  }

  async seed(socialMedias: SocialMedia[]) {
    // cek apakah collection social_media kosong?
    const socialMediaCollection = await this._repository.findOne().exec();
    if (isEmpty(socialMediaCollection)) {
      // jika collection social_media kosong, masukkan data awal
      this._repository.insertMany(socialMedias);
      console.log('SocialMedia collection seeded successfully');
    }
  }
}
