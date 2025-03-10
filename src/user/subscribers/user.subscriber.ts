
import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
  } from 'typeorm';
  import { User } from '../user.entity';
  import * as bcrypt from 'bcrypt'
  
  @EventSubscriber()
  export class UserSubscriber implements EntitySubscriberInterface<User> {
    constructor(dataSource: DataSource) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return User;
    }
  
    beforeInsert(event: InsertEvent<User>) {

        const user = event.entity
        const hashedPass = bcrypt.hashSync(user.password, 10)
        user.password = hashedPass
    }

    beforeUpdate(event: UpdateEvent<User>) {

      const user = event.entity
      if(user && user.password){
        const hashedPass = bcrypt.hashSync(user.password, 10)
        user.password = hashedPass
      }
  }
  }
  