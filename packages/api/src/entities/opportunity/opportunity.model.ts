import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Iteration } from '../iteration/iteration.model';
import { Company } from '../company/company.model';
import { Project } from '../project/project.model';
import { User } from '../user/user.model';
import { Interview } from '../interview/interview.model';

@Table({ timestamps: false, tableName: 'jso_opportunity' })
export class Opportunity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column('date')
  date: Date;

  @Column('date')
  final_date: Date;

  @Column
  name: string;

  @Column
  @ForeignKey(() => Iteration)
  iteration_id: number;

  @BelongsTo(() => Iteration)
  iteration: Iteration;

  @ForeignKey(() => Company)
  @Column
  company_id: number;

  @BelongsTo(() => Company)
  company: Company;

  @ForeignKey(() => Project)
  @Column
  project_id: number;

  @BelongsTo(() => Project)
  project: Project;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Interview)
  interviews: Interview[];
}
