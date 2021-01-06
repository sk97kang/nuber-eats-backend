import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
export class Category extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  @Length(5)
  name: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  @IsString()
  coverImg: string;

  @Column({ unique: true })
  @Field((type) => String)
  @IsString()
  slug: string;

  @OneToMany((type) => Restaurant, (restaurant) => restaurant.category)
  @Field((type) => [Restaurant], { nullable: true })
  restaurants: Restaurant[];
}
