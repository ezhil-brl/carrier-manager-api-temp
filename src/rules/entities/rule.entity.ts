import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organizations } from '../../organizations/entities/organization.entity';

export enum PackageType {
  BOX = 'Box',
  ENVELOPE = 'Envelope',
  TUBE = 'Tube',
  PALLET = 'Pallet',
}

@Entity()
export class Rules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organizations, { nullable: false })
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'text', nullable: true })
  origin_facility: string;

  @Column({ type: 'text', nullable: true })
  shipping_service: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  billable_weight: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  package_shape: string;

  @Column({ type: 'text', nullable: true })
  dimensions: string;

  @Column({ type: 'text', nullable: true })
  contents_description: string;

  @Column({ type: 'enum', enum: PackageType, nullable: true })
  package_type: string;

  @Column({ type: 'text', nullable: true })
  provider_scope: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  external_id: string;

  @Column({ type: 'text', nullable: true })
  service_type: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  carrier_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  subtotal_rate: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
