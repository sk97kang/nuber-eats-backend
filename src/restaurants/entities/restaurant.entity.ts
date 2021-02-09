import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Category } from './category.entity';
import { Dish } from './dish.entity';

@Entity()
@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
export class Restaurant extends CoreEntity {
  @Column()
  @Field(type => String)
  @IsString()
  @Length(5)
  name: string;

  @Column()
  @Field(type => String)
  @IsString()
  coverImg: string;

  @Column()
  @Field(type => String)
  @IsString()
  address: string;

  @ManyToOne(type => Category, category => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @Field(type => Category, { nullable: true })
  category: Category;

  @ManyToOne(type => User, user => user.restaurants, {
    onDelete: 'CASCADE',
  })
  @Field(type => User)
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @OneToMany(type => Dish, dish => dish.restaurant)
  @Field(type => [Dish])
  menu: Dish[];

  @OneToMany(type => Order, restaurant => restaurant.customer)
  @Field(type => [Order])
  orders: Order[];

  @Field(type => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field(type => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}
