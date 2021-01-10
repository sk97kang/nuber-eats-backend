import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInputType', { isAbstract: true })
@ObjectType()
class DishChoice {
  @Field(type => String)
  name: string;

  @Field(type => Int, { nullable: true })
  extra?: number;
}

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
class DishOption {
  @Field(type => String)
  name: string;

  @Field(type => [DishChoice], { nullable: true })
  choices?: DishChoice[];

  @Field(type => Int, { nullable: true })
  extra?: number;
}

@Entity()
@InputType('DishInputType', { isAbstract: true })
@ObjectType()
export class Dish extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  @Length(5)
  name: string;

  @Column()
  @Field(type => Int)
  @IsNumber()
  price: number;

  @Column({ nullable: true })
  @Field(type => String, { nullable: true })
  @IsString()
  photo: string;

  @Column()
  @Field(type => String)
  @Length(5, 140)
  description: string;

  @ManyToOne(type => Restaurant, restaurant => restaurant.menu, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Field(type => Restaurant)
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Column({ type: 'json', nullable: true })
  @Field(type => [DishOption], { nullable: true })
  options: DishOption[];
}
