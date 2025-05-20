import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Disc {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  inBag: boolean;

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
