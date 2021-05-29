import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate
} from 'typeorm';
import  * as bcrypt  from 'bcrypt';
import Pets from './Pets';
//model as schema
@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  additional: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Pets, pets => pets.user_id, {
    cascade: ['insert', 'update'],
  })

  @JoinColumn({ name: 'user_id' })
  pets: Pets;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async comparePassword(attempt: string) {
    return bcrypt.compare(attempt, this.password);
  }

  @BeforeUpdate()
  async hashPasswordUpdated() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }

  async comparePasswordUpdated(attempt: string) {
    return bcrypt.compare(attempt, this.password);
  }
}
