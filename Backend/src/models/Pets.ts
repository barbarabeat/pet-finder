import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm';

import Users from './Users';

@Entity('pets')
export default class Pets {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  age: number;

  @Column()
  weight: number;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  isAdopted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Users, users => users.pets)

  @JoinColumn({ name: 'user_id' })
  user_id: Users;

};

