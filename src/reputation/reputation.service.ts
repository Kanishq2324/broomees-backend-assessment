import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class ReputationService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getSystemReputationStats() {
    const threshold = Number(process.env.DELETE_REPUTATION_THRESHOLD ?? 0);

    const [summaryAgg, usersAboveThreshold, topUsers] = await Promise.all([
      this.userModel.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            averageReputation: { $avg: '$reputationScore' },
            minReputation: { $min: '$reputationScore' },
            maxReputation: { $max: '$reputationScore' },
          },
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            averageReputation: { $ifNull: ['$averageReputation', 0] },
            minReputation: { $ifNull: ['$minReputation', 0] },
            maxReputation: { $ifNull: ['$maxReputation', 0] },
          },
        },
      ]),

      this.userModel.countDocuments({ reputationScore: { $gt: threshold } }),

      this.userModel
        .find({}, { username: 1, reputationScore: 1, createdAt: 1 })
        .sort({ reputationScore: -1, createdAt: 1 })
        .limit(10),
    ]);

    const summary =
      summaryAgg[0] ?? {
        totalUsers: 0,
        averageReputation: 0,
        minReputation: 0,
        maxReputation: 0,
      };

    return {
      threshold,
      ...summary,
      usersAboveThreshold,
      topUsers: topUsers.map((u) => ({
        id: u._id,
        username: u.username,
        reputationScore: u.reputationScore,
      })),
    };
  }
}
