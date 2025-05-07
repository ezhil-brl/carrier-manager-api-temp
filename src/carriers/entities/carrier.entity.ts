import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carriers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  service_type: string;

  @Column({ type: 'text', nullable: false })
  provider_scope: string;

  @Column({ type: 'text', nullable: false })
  external_id: string;
}
