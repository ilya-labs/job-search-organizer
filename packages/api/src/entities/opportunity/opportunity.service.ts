import { OpportunityDto } from '@job-search-organizer/common/src';

import { OpportunityModel } from '../../db/models/opportunity.model';

export class OpportunityService {
  async getAllFromIteration(iterationId: string) {
    return OpportunityModel.findAll({
      where: {
        iterationId,
      },
    });
  }

  async getById(opportunityId: string) {
    return OpportunityModel.findOne({
      where: {
        id: opportunityId,
      },
    });
  }

  async create(data: OpportunityDto) {
    return OpportunityModel.create(data);
  }
}
