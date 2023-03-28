import AbstractEntity from '../common/entities/abstract.entity';
import UserEntity from '../users/user.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
@Index(['owner.id', 'title'], { unique: true })
class TaskEntity extends AbstractEntity {
  @Column()
  public title: string;

  @Column({ nullable: true })
  public description: string;

  @Column('boolean', { default: false })
  public isDone: boolean;

  @ManyToOne(() => UserEntity, (owner: UserEntity) => owner.tasks)
  public owner: UserEntity;
}

export default TaskEntity;
