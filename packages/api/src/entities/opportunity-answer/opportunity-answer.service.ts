import { Injectable } from '@nestjs/common';
import { OpportunityAnswer } from './opportunity-answer.model';
import { CreateOpportunityAnswerDto } from './dto/create-opportunity-answer.dto';
import { UpdateOpportunityAnswerDto } from './dto/update-opportunity-answer.dto';

@Injectable()
export class OpportunityAnswerService {
  async findAllOpportunityAnswers(
    opportunityId: number,
  ): Promise<OpportunityAnswer[]> {
    return OpportunityAnswer.findAll({
      where: { opportunity_id: opportunityId },
    });
  }

  async findAllOpportunityAnswersByIds(
    opportunityId: number,
    oppAnswerIds: number[],
  ): Promise<OpportunityAnswer[]> {
    return OpportunityAnswer.findAll({
      where: { opportunity_id: opportunityId, id: oppAnswerIds },
    });
  }

  async create(
    opportunityId: number,
    opportunityAnswerData: CreateOpportunityAnswerDto[],
  ): Promise<OpportunityAnswer[] | never> {
    const incomingOppAnswers = opportunityAnswerData.map(
      (answerData) => new OpportunityAnswer(answerData),
    );

    const saveAnswerPromises = incomingOppAnswers.map((answer) =>
      answer.save(),
    );

    return await Promise.all(saveAnswerPromises);
  }

  async update(
    opportunityId: number,
    opportunityAnswerData: UpdateOpportunityAnswerDto[],
  ): Promise<OpportunityAnswer[] | never> {
    const oppAnswerIds = opportunityAnswerData.map((answer) => answer.id);

    const existingOppAnswers = await this.findAllOpportunityAnswersByIds(
      opportunityId,
      oppAnswerIds,
    );

    const saveAnswerPromises = existingOppAnswers.reduce(
      (answerPromises: Promise<OpportunityAnswer>[], answer) => {
        const dataToUpdate = this.findMatchingAnswerData(
          opportunityAnswerData,
          answer,
        );

        if (!dataToUpdate) {
          return answerPromises;
        }

        answerPromises.push(answer.update(dataToUpdate));

        return answerPromises;
      },
      [],
    );

    return await Promise.all(saveAnswerPromises);
  }

  private filterOutExisting(
    incomingAnswers: OpportunityAnswer[],
    existingAnswers: OpportunityAnswer[],
  ): OpportunityAnswer[] {
    // todo should be optimized
    return incomingAnswers.filter((incoming) => {
      const existingAnswer = existingAnswers.find((existing) => {
        return (
          existing.answer_id === incoming.answer_id &&
          existing.opportunity_id === incoming.opportunity_id &&
          existing.question_id === incoming.question_id
        );
      });

      return !existingAnswer;
    });
  }

  private excludeNew(
    incomingAnswers: OpportunityAnswer[],
    existingAnswers: OpportunityAnswer[],
  ): OpportunityAnswer[] {
    // todo should be optimized
    return existingAnswers.filter((existing) =>
      incomingAnswers.find(
        (incoming) =>
          incoming.answer_id === existing.answer_id &&
          incoming.opportunity_id === existing.opportunity_id &&
          incoming.question_id === existing.question_id,
      ),
    );
  }

  private findMatchingAnswerData(
    answerData: UpdateOpportunityAnswerDto[],
    answer: OpportunityAnswer,
  ) {
    return answerData.find((incomingAnswer) => incomingAnswer.id === answer.id);
  }
}
