import AbstractEntity from '../common/entities/abstract.entity';
import TaskEntity from '../tasks/task.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
class UserEntity extends AbstractEntity {
  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ select: false })
  public password: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.owner)
  public tasks: TaskEntity[];
}

export default UserEntity;
