import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/User.js';
import { deleteStreamUser, upserStreamUser } from './Stream.js';

export const inngest = new Inngest({ id: 'code-IQ' });

const syncUser = inngest.createFunction(
  { id: 'syc-user', triggers: [{ event: 'clerk/user.created' }] },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ' '} ${last_name || ''}`,
      profileImage: image_url,
    };
    await User.create(newUser);

    await upserStreamUser({
        id:newUser.clerkId.toString(),
        name: newUser.name,
        image: newUser.profleImage,
    })
    //todo: do something else here
  },
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: 'delete-user-from-db',
    triggers: [{ event: 'clerk/user.deleted' }],
  },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString())
    //todo: do something else here
  },
);

export const functions = [syncUser, deleteUserFromDB];
