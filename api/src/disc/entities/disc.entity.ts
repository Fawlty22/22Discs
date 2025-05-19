import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Disc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  bag: boolean;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column()
  speed: number;

  @Column()
  glide: number;

  @Column()
  turn: number;

  @Column()
  fade: number;

  @Column()
  flightpath: string;
}
