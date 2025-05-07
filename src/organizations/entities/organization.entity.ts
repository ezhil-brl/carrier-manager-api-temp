import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum CarrierPreference {
  CHEAPEST = 'cheapest',
  NONE = 'none',
}

@Entity()
export class Organizations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  code: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'enum', enum: CarrierPreference, nullable: true })
  carrier_preference: string;
}
